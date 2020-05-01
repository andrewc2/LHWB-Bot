const Eris = require("eris");
const config = require("./authmusic.json");
const mysql = require("mysql");
const fs = require('fs');

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

lhwb.on("disconnect", (err, event) => {
    log(`Bot disconnected from Discord with code ${event} for reason: ${err}`);
    lhwb.leaveVoiceChannel(defaultVC);
    setTimeout(lhwb.connect, 20000);
}); // unsure of how to test this

let firstJoin = true;
let defaultVC = config.discord.vc;
let defaultServer = config.discord.server;

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
    if(firstJoin) setTimeout(play, 2000); // 5000
    firstJoin = false;
}

function isMod(msg) {
    if(msg.member.roles.includes(config.discord.mod_role)) return true; // mod role rep role
    // if(msg.member.roles.includes("636425021622845450")) return true; // (test role in leo server)
    return false;
}

function play() {
    stopped = false;

    let vConnection = lhwb.voiceConnections.get(defaultServer);
    db.query("SELECT COUNT(*) AS total FROM queue", function(error, result, fields) {
        let sql = "SELECT name, path, queuedby FROM queue";

        if(result[0].total <= 0) 
            sql = "SELECT DISTINCT path, name FROM music WHERE type != 'unreleased' ORDER BY RAND() LIMIT 1";

        db.query(sql, function(error, result, fields) {
            if(result == null) return;

            let songpath = result[0].path;
            let songname = result[0].name;
            let queuedBy = result[0].queuedby ? result[0].queuedby : null;
            //detele queue item
            if(queuedBy) db.query("DELETE FROM queue WHERE path = ?", [songpath]);

            //Make sure file eixsts to minimize runtime fatals
            try {
                if(fs.existsSync(config.discord.music_path + `/${songpath}`))
                    log("song exists");
                else {
                    log("song doesnt exists, retrying..");
                    play();
                    return;
                }
            } catch(err) { console.error(err); }

            //Can't play music unless we're connected can we?
            if(!vConnection) {
                log("Not connected to voice");
                initVC();
                return;
            }

            //Start the sogn and set status
            if(vConnection.playing) vConnection.stopPlaying();
            vConnection.play(config.discord.music_path + `/${songpath}`);
            lhwb.editStatus("online", { name: songname, type: 2 });

            //When song ends we play another, and when we disconnect we reconnect
            vConnection.once("end", () => {
                log("Song ended, moving on...");
                if(!stopped) setTimeout(() => play(), 1000);
            });
            vConnection.once("disconnect", () => setTimeout(() => initVC(), 10000));

            //if we're the only member in the channel we don't update playcount
            if(lhwb.getChannel(vConnection.channelID).voiceMembers.size > 1) {
                db.query("UPDATE music SET playcount = playcount + 1 WHERE path = ?",[songpath]);
            }
            addToRecent(songname, queuedBy);

            log(songpath + " " + songname + " is now playing " + ( queuedBy == null ? "" : `(queued by ${queuedBy})`));
        });
    });
}

function addToRecent(song, queuedBy){
    //Adds recently played songs to database
    if(queuedBy != "") {
        db.query("SELECT album FROM music WHERE name = ?",[song], function(err,result) {
            if (err) return log(err + " " + result);
            var currentAlbum = result[0]['album'];
            db.query("INSERT INTO recent (name, album, queuedby) VALUES (?,?,?)", [song, currentAlbum, queuedBy]);
        });
    } else {
        db.query("SELECT album FROM music WHERE name = ?",[song], function(err,result) {
            if (err) return log(err);
            var currentAlbum = result[0]['album'];
            db.query("INSERT INTO recent (name, album) VALUES (?,?)", [song, currentAlbum], function(err) {
                if (err) return log(err);
            });
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

//variables for handling the skip coolodown
const skipCool = 5 * 1000;
let lastSkip = Date.now() - skipCool;

function skip() {
    if (lastSkip > Date.now() - skipCool) {
        log("Skip cooldown activated.")
        return;
    }

    lastSkip = Date.now();
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
