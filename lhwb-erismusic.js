const Eris = require("eris");
const config = require("./auth.json");
const mysql = require("mysql");

const db = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.username,
    password: config.mysql.password,
    database: config.mysql.database
});

let lhwb = new Eris(config.discord.token);

lhwb.on("ready", () => {
    log(`Logged in as ${lhwb.user.username}#${lhwb.user.discriminator} - (${lhwb.user.id})`);
    log(`Joining voice chat and playing after 10 seconds.`);
    setTimeout(initVC, 5000);
});

lhwb.on("messageCreate", msg => {
    let command = msg.content.split(" ");

    switch(command[0].toLowerCase()) {
        case "!lplay":
            if(isMod(msg)) setTimeout(play, 5000);
            break;
        case "!lskip":
            if(isMod(msg)) skip();
            break;
        case "!lstop":
            if(isMod(msg)) stop();
            break;
        case "!musicrestart":
            if(isMod(msg)) musicrestart(msg);
            break;
    }
});

/*lhwb.on("disconnect", (err, event) => {
    log(`Bot disconnected from Discord with code ${event} for reason: ${err}`);
    lhwb.leaveVoiceChannel(defaultVC);
    setTimeout(lhwb.connect, 20000);
});*/ // unsure of how to test this

let firstJoin = true;
let defaultVC = config.discord.vc;
let defaultServer = config.discord.server;

let queue = [];
let queuedBy = "";
let recent = [];

let stopped = false;
let currentSong = "";

function initVC() {
    try {
        lhwb.joinVoiceChannel(defaultVC);
        log(`Successfully joined voice chat.`);
    } catch(err) {
        log(`Failed to join voice chat.\n\n${err}\n`);
        log(`Attempting to reconnect in 5 seconds...`);
        setTimeout(initVC, 5000);
    }
    if(firstJoin) setTimeout(play, 5000);
    firstJoin = false;
}

function isMod(msg) {
    if(msg.member.roles.includes("636425021622845450")) return true; // mod role (test role in leo server)
    // if(msg.member.roles.includes("636425021622845450")) return true; // rep role
    return false;
}

function play() {
    stopped = false;

    let vConnection = lhwb.voiceConnections.get(defaultServer);

    if(queue.length > 0) {
        log("There is a queue.");
        var temp = queue.shift();
        if(temp.path === "Random.mp3") { //Allows for queueing a random song when Random.mp3 is queued
            db.getConnection(function(err, connection){
                db.query("SELECT DISTINCT path FROM music WHERE type != ? ORDER BY RAND() LIMIT 1",["unreleased"], function(err,result) {
                    if(result != null) {
                        queuedBy = temp.user;
                        currentSong = result[0]['path'];
                        log(currentSong.slice(0,-4) + " is now playing");
                        addPlay(currentSong);
                        addToRecent(currentSong.slice(0,-4));
                        vConnection.play(`C:\\Users\\cesar\\Music\\Taylor Swift\\lhwb\\${currentSong}`);
                        lhwb.editStatus("online", { name: currentSong.slice(0, -4), type: 2 });
                        log("Played random song");
                    }
                });
                connection.release();
            });
        } else {
            currentSong = temp.path;
            queuedBy = temp.user;
            log(queuedBy);
            addPlay(currentSong);
            addToRecent(currentSong.slice(0,-4));
            vConnection.play(`C:\\Users\\cesar\\Music\\Taylor Swift\\lhwb\\${currentSong}`);
            lhwb.editStatus("online", { name: currentSong.slice(0, -4), type: 2 });
            log(currentSong.slice(0,-4) + " is now playing");
            log("Played user requested song, not random");
        }
    } else {
        db.getConnection(function(err, connection) {
            if(!err) {
                db.query("SELECT DISTINCT path FROM music WHERE type != ? ORDER BY RAND() LIMIT 1",["unreleased"], function(err,result) {
                //gets path from the music db, and randomly selects a non-unreleased track
                    if(result != null) {
                        queuedBy = "";
                        currentSong = result[0]['path'];
                        log(`${currentSong.slice(0,-4)} is now playing.`);
                        if (vConnection) {
                            if(vConnection.playing) vConnection.stopPlaying();
                            log("connection playing: yes")
                        }
                        vConnection.play(`C:\\Users\\cesar\\Music\\Taylor Swift\\lhwb\\${currentSong}`);
                        lhwb.editStatus("online", { name: currentSong.slice(0, -4), type: 2 });
                        vConnection.once("end", () => {
                            log("Song ended, moving on...");
                            if(!stopped) setTimeout(function() { play(); }, 2000);
                        });
                        addPlay(currentSong);
                        addToRecent(currentSong.slice(0,-4));
                        log("Queue empty, Playing songs randomly");
                    }
                });
                connection.release();
            } else {
                console.log(err);
            }
        });
    };
}

function addPlay(song){
    db.query("UPDATE music SET playcount = playcount + 1 WHERE path = ?",[song])
}


function addToRecent(song){
    //Adds recently played songs to database
    if(queuedBy != "") {
        db.query("SELECT album FROM music WHERE name = ?",[song], function(err,result) {
            if (err) return console.log(err + " " + result);
            var currentAlbum = result[0]['album'];
            db.query("INSERT INTO recent (name, album, queuedby) VALUES (?,?,?)", [song, currentAlbum, queuedBy]);
        });
    } else {
        db.query("SELECT album FROM music WHERE name = ?",[song], function(err,result) {
            if (err) return console.log(err);
            var currentAlbum = result[0]['album'];
            db.query("INSERT INTO recent (name, album) VALUES (?,?)", [song, currentAlbum]);
        });
    }
}

function stop() {
    let vConnection = lhwb.voiceConnections.get(defaultServer);
    if(vConnection) {
        stopped = true;
        setTimeout(function() { vConnection.stopPlaying(); }, 1000);
    }
}

function skip() {
    stop();
    setTimeout(function() { play(); }, 2000);
}

function musicrestart(msg) {
    lhwb.leaveVoiceChannel(defaultVC);
    lhwb.createMessage(msg.channel.id, "LHWB Music restarting!");
    setTimeout(function() { process.exit(-1); }, 2000);
}

function log(content) {
    console.log(`${time()} - ${content}`);
}

function time() {
    const date = new Date();
    let time = date.toLocaleString();
    return time;
}

lhwb.connect();
