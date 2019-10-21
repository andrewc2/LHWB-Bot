const Discord = require("discord.js");
const fs = require("fs");
const config = require("./auth.json");
const mysql = require("mysql");

const db = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.database
});

const lhwb = new Discord.Client();

lhwb.on("ready", () => {
    log(`Logged in as ${lhwb.user.tag} (${lhwb.user.id})`);
    log(`Joining voice chat and playing after 10 seconds.`);
    setTimeout(initVC, 5000);
});

let firstJoin = true;
let stopped = false;
let defaultVC = config.discord.default_vc;

let stream = fs.createReadStream("C:\\Users\\cesar\\Music\\John Mayer\\1994\\02 Texas Flood.mp3");

function initVC() { // Initial connection to voice chat
    try {
        lhwb.channels.get(defaultVC).join();
        log(`Successfully joined voice chat.`);
        log(lhwb.channels.get(defaultVC).connection.status);
    } catch(err) {
            log(`Failed to join voice chat.\n\n${err}\n`);
            log(`Attempting to reconnect in 5 seconds...`);
            setTimeout(initVC, 5000); // Auto reconnect stuff
    }
    if (firstJoin) setTimeout(play, 5000);
    firstJoin = false;
}

/*lhwb.on("disconnect", () => {
    log(`Disconnected because reasons.`);   This function serves no purpose
});*/

let queue = [];
let queuedBy = "";
let recent = [];

lhwb.on("message", message => {
    let command = message.content.split(" ");
    let params = command.slice(1, command.length).join(" ");

    switch(command[0].toLowerCase()) {
        case "!rwq":
            q(message);
            break;
        case "!rwstop":
            stop();
            message.channel.send("stopped");
            break;
        case "!rwplay":
            setTimeout(play, 5000);
            message.channel.send("starting...");
            break;
        //case "!joinvc":
            //message.channel.send(command[1]);
            ///joinVC(command[1]);
            //break;
        //case "!rwstop":
           // play(message, "stop");
            //break;
    }
});

function joinVC(chID, message) {
    let channel = chID;
    try {
        lhwb.channels.get(channel).join();
    } catch (err) {

    }
}

/*function leaveVC(message) {
    if(message.guild.voiceConnection) {
        
    }
}*/

function play(){
    stopped = false;
    //bot.getAudioContext(chan, function(err,stream) {
        //if (err) return console.error(err);
        let vConnection = lhwb.guilds.get("462534164726677504").voiceConnection;
        let dump = fs.createWriteStream("oof.txt");
        stream.pipe(dump, { end: false });
        log(vConnection);
        if(vConnection) {
            if(queue.length > 0) {
                log("There is a queue.");
                let temp = queue.shift();
                if(temp.path === "Random.mp3"){ //Allows for queueing a random song when Random.mp3 is queued
                    db.getConnection(function(err, connection){
                        db.query("SELECT DISTINCT path FROM music WHERE type != ? ORDER BY RAND() LIMIT 1",["unreleased"], function(err,result) {
                            if(result != null) {
                                queuedBy = temp.user;
                                currentSong = result[0]['path'];
                                log(`${currentSong.slice(0,-4)} is now playing.`);
                                addPlay(currentSong);
                                addToRecent(currentSong.slice(0,-5));
                                stream = fs.createReadStream(`C:\\Users\\cesar\\Music\\Taylor Swift\\Red\\${currentSong}`);
                                vConnection.playStream(stream);
                                lhwb.user.setActivity(currentSong.slice(0, -5), { type : "LISTENING" }); //sets Playing to current song
                                log("Played a random song");
                            }
                        });
                        connection.release();
                    });
                } else {
                    currentSong = temp.path;
                    queuedBy = temp.user;
                    log(queuedBy);
                    addPlay(currentSong);
                    addToRecent(currentSong.slice(0,-5));
                    stream = fs.createReadStream(`C:\\Users\\cesar\\Music\\Taylor Swift\\Red\\${currentSong}`);
                    vConnection.playStream(stream);
                    lhwb.user.setActivity(currentSong.slice(0, -5), { type : "LISTENING" }); //sets Playing to current song
                    log(`${currentSong.slice(0,-4)} is now playing.`);
                    log("Played a user requested song, not random");
                }
            } else {
                db.getConnection(function(err, connection){
                    if(!err){
                        db.query("SELECT DISTINCT path FROM music WHERE type != ? ORDER BY RAND() LIMIT 1",["unreleased"], function(err,result) {
                        // random
                            if(result != null) {
                                queuedBy = "";
                                currentSong = result[0]['path'];
                                log(`${currentSong.slice(0,-5)} is now playing.`);
                                addPlay(currentSong);
                                addToRecent(currentSong.slice(0,-5));
                                //fs.createReadStream('/home/redbot/music/' + currentSong).pipe(stream, {end:false}); new version of playAudioFile
                                stream = fs.createReadStream(`C:\\Users\\cesar\\Music\\Taylor Swift\\Red\\${currentSong}`);
                                vConnection.playStream(stream);
                                lhwb.user.setActivity(currentSong.slice(0, -5), { type : "LISTENING" }); //sets Playing to current song
                                stream.pipe(dump, { end: false });
                                stream.on("end", () => {
                                    log("over");
                                    if(!stopped) {
                                    setTimeout(function() {
                                    play();
                                }, 2000);
                                log("Playing the next song");
                                }
                                });
                                log("Queue empty, Playing songs randomly");
                            }
                        });
                        connection.release();
                    } else {
                        log(err);
                    }
                });
            };
            
    } else {
        log("oof");
    }
}

function stop(){
    let vConnection = lhwb.guilds.get("462534164726677504").voiceConnection;
    //let stream = fs.createReadStream("C:\\Users\\cesar\\Music\\John Mayer\\1994\\02 Texas Flood.mp3");
    if(vConnection) {
        stopped = true;
        setTimeout(function(){ stream.unpipe();},1000);
        //setTimeout(function(){ stream.stopAudioFile();},1000); //new version stream.unpipe()
    } else {
        log("oof");
    }
}

function skip(user){
    log(`${user} requested the song be skipped`);
    stop();
    setTimeout(function(){
        play();
    },2000);
    log("Skipping Song");
}

function addToRecent(song){
    //Adds recently played songs to database
    if(queuedBy != "") {
        db.query("SELECT album FROM music WHERE name = ?",[song], function(err,result) {
            if (err) return console.log(err + " " + result);
            let currentAlbum = result[0]['album'];
            db.query("INSERT INTO recent (name, album, queuedby) VALUES (?,?,?)", [song, currentAlbum, queuedBy]);
        });
    } else {
        db.query("SELECT album FROM music WHERE name = ?",[song], function(err,result) {
            if (err) return console.log(err);
            let currentAlbum = result[0]['album'];
            db.query("INSERT INTO recent (name, album) VALUES (?,?)", [song, currentAlbum]);
        });
    }
}

function addPlay(song){
    db.query("UPDATE music SET playcount = playcount + 1 WHERE path = ?",[song])
}

function log(content) {
    console.log(`${time()} - ${content}`);
}

function time() {
    const date = new Date();
    let time = date.toLocaleString();
    return time;
}

lhwb.login(config.discord.token);