const Eris = require("eris");
const config = require("./authMusicMain.json");
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
            if(isMod(msg)) setTimeout(() => play(msg), 500);
            break;
        case "!lskip":
            if(isMod(msg)) skip(msg);
            break;
        case "!lstop":
            if(isMod(msg)) stop(msg);
            break;
        case "!musicrestart":
            if(isMod(msg)) musicrestart(msg);
            break;
        case "!musicversion":
            versionCommand(msg);
            break;
        case "!toggleskip":
            if(isOwner(msg)) toggleSkip(msg);
            break;
        case "!lpause":
            if(isOwner(msg)) pause(msg);
            break;
        case "!lresume":
            if(isOwner(msg)) resume(msg);
            break;
    }
});

lhwb.on("disconnect", (err, event) => {
    log(`Bot disconnected from Discord with code ${event} for reason: ${err}`);
    //let vConnection = lhwb.voiceConnections.get(defaultServer);
    //vConnection.pause();
    lhwb.leaveVoiceChannel(defaultVC);
    //setTimeout(initVC, 10000)
    log("attempted to rejoin voice channel after 10s")
    setTimeout(lhwb.connect, 20000);
}); // unsure of how to test this

lhwb.on("error", (err, event) => console.log(`An Error Ocurred: ${event} reason ${err}`))
lhwb.on("shardDisconnect", (err, event) => console.log(`shard disconnected code ${event} reason ${err}`))
lhwb.on("shardResume", (event) => console.log(`shard resumed id: ${event}`))

let firstJoin = true;
let defaultVC = config.discord.vc;
let defaultServer = config.discord.server;

let skipDisable = false;
let stopped = false;
let paused = false;

function initVC() {
    try {
        lhwb.joinVoiceChannel(defaultVC);
        log(`Successfully joined voice chat.`);
    } catch(err) {
        log(`Failed to join voice chat.\n\n${err}\n`);
        log(`Attempting to reconnect in 5 seconds...`);
        setTimeout(initVC, 5000);
    }
    if(firstJoin) setTimeout(() => play(null), 5000);
    firstJoin = false;
}

function isMod(msg) {
    if(msg.member.roles.includes(config.discord.mod_role)) return true; // mod role = rep role
    lhwb.createMessage(msg.channel.id, {
        embed: {
            description: "Only those with the reputation role can perform this task.",
            color: 0xFF0000,
        }
    });
    return false;
}

function isOwner(msg) {
    if(msg.member.id.includes(config.discord.owner)) return true; // iAndrewC
    lhwb.createMessage(msg.channel.id, {
        embed: {
            description: "Only iAndrewC can perform this task.",
            color: 0xFF0000,
        }
    });
    return false;
}

function toggleSkip(msg) {
    skipDisable = !skipDisable;
    if(skipDisable){
        log("disabled skip " + skipDisable);
        lhwb.createMessage(msg.channel.id, {
            embed: {
                description: "Skiping has been disabled.",
                color: 0xFF0000, // Color, either in hex (show), or a base-10 integer
            }
        });
    } else {
        log("skip enabled " + skipDisable);
        lhwb.createMessage(msg.channel.id, {
            embed: {
                description: "Skiping has been enabled.",
                color: 0x00FF5A, // Color, either in hex (show), or a base-10 integer
            }
        });
    }
}

function play(message) {
    if(message && stopped){
        lhwb.createMessage(message.channel.id, {
            embed: {
                description: "Music will now begin playing!",
                color: 0x00FF5A, // Color, either in hex (show), or a base-10 integer
                footer : {
                    text: `Requested by: ${message.author.username}`
                }
            }
        });
    }

    stopped = false;
    
    let vConnection = lhwb.voiceConnections.get(defaultServer);

    if (vConnection) {
        if(vConnection.playing) {
            if(message) {
                lhwb.createMessage(message.channel.id, {
                    embed: {
                        description: "Music is already playing. No further actions will occur.",
                        color: 0xFF0000, // Color, either in hex (show), or a base-10 integer
                        footer : {
                            text: `Requested by: ${message.author.username}`
                        }
                    }
                });
            }
            log("connection already playing");
            return; //vConnection.stopPlaying();
        }
    }

    db.getConnection(function(err,connection){
        if(!err) {
            db.query("SELECT COUNT(*) AS total FROM queue", function(err,length) {
                if(length['0'].total > 0){
                    log("There is a queue.");
                    db.query("SELECT name, path, queuedby FROM queue", function(err, result){
                        if(result != null) {
                            songpath = result[0].path;
                            songname = result[0].name;
                            queuedby = result[0].queuedby;
                            log(songpath + " " + songname + " " + queuedby);

                            //confirms song file exists, if not log song path to db and retry
                            try {
                                if(fs.existsSync(config.discord.music_path + `/${songpath}`))
                                    log("Song Exists");
                                else {
                                    log(`${songpath} doesn't exist retrying`);
                                    db.query("INSERT INTO requested (user, request) VALUES (?,?)", ["LHWB Song Missing", songpath]);
                                    play(null);
                                    return;
                                }
                            } catch(err) { console.error(err); }
                            
                            vConnection.play(config.discord.music_path + `/${songpath}`); //Starts song 
                            lhwb.editStatus("online", { name: songname, type: 2 }); //updates status to song title
                            db.query("DELETE FROM queue WHERE path = ?", [songpath]); //deletes the song from the queue.
                            
                            vConnection.once("end", () => { //when the song ends play next track
                                log("Song ended, moving on...");
                                if(!stopped) setTimeout(function() { play(null); }, 500);
                            });

                            if(lhwb.getChannel(vConnection.channelID).voiceMembers.size > 1) { //don't log plays with no listeners
                                addPlay(songpath);
                            }

                            addToRecent(songname, queuedby);
                            log(songname + " is now playing.\nPlayed user requested song, not random");
                        }
                    });
                } else {
                    db.query("SELECT DISTINCT path, name FROM music WHERE type != ? ORDER BY RAND() LIMIT 1",["unreleased"], function(err,result) {
                        //gets path from the music db, and randomly selects a released track
                        if(result != null) {
                            songpath = result[0].path;
                            songname = result[0].name;
                            queuedBy = "";

                            log(songpath + " " + songname + " is now playing.");

                            //confirms song file exists, if not log song path to db and retry
                            try {
                                if(fs.existsSync(config.discord.music_path + `/${songpath}`))
                                    log("Song Exists");
                                else {
                                    log(`${songpath} doesn't exist retrying`);
                                    db.query("INSERT INTO requested (user, request) VALUES (?,?)", ["LHWB Song Missing", songpath]);
                                    play(null);
                                    return;
                                }
                            } catch(err) { console.error(err); }
                            
                            vConnection.play(config.discord.music_path + `/${songpath}`); //Starts song 
                            lhwb.editStatus("online", { name: songname, type: 2 }); //updates status to song title

                            vConnection.once("end", () => { //when the song ends play next track
                                log("Song ended, moving on...");
                                if(!stopped) setTimeout(function() { play(null); }, 1000);
                            });

                            if(lhwb.getChannel(vConnection.channelID).voiceMembers.size > 1) { //don't log plays with no listeners
                                addPlay(songpath);
                            }

                            addToRecent(songname);

                            log("Queue empty, Playing songs randomly");
                        }
                    });
                }
            });
            connection.release();
        } else {
            log(err);
        }

    });
}

function addPlay(song){
    db.query("UPDATE music SET playcount = playcount + 1 WHERE path = ?",[song])
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

function stop(message) {
    let vConnection = lhwb.voiceConnections.get(defaultServer);
    if(vConnection) {
        stopped = true;
        paused = false;
        setTimeout(function() { vConnection.stopPlaying(); }, 1000);
        if(message && stopped){
            lhwb.createMessage(message.channel.id, {
                embed: {
                    description: "Music is now stopping. - Use !lplay to start music again.",
                    color: 0xFF0000, // Color, either in hex (show), or a base-10 integer
                    footer : {
                        text: `Requested by: ${message.author.username}`
                    }
                }
            });
        }
        log("music stopped?");
    }
}

function pause(message) {
    let vConnection = lhwb.voiceConnections.get(defaultServer);
    if(vConnection) {
        if(message && paused){
            lhwb.createMessage(message.channel.id, {
                embed: {
                    description: "Music is already paused. - Use !lresume to restart music.",
                    color: 0xFF0000, // Color, either in hex (show), or a base-10 integer
                    footer : {
                        text: `Requested by: ${message.author.username}`
                    }
                }
            });
            return;
        } else {
            lhwb.createMessage(message.channel.id, {
                embed: {
                    description: "Music has been paused! - Use !lresume to restart music.",
                    color: 0x00FF5A, // Color, either in hex (show), or a base-10 integer
                    footer : {
                        text: `Requested by: ${message.author.username}`
                    }
                }
            }); 
        }
        paused = true;
        setTimeout(function() { vConnection.pause(); }, 1000);
        log("music paused?");
    }
}

function resume(message) {
    let vConnection = lhwb.voiceConnections.get(defaultServer);
    if(vConnection) {
        if(message && !paused){
            lhwb.createMessage(message.channel.id, {
                embed: {
                    description: "Music is already playing. - Use !lpause to pause music again.",
                    color: 0xFF0000, // Color, either in hex (show), or a base-10 integer
                    footer : {
                        text: `Requested by: ${message.author.username}`
                    }
                }
            });
            return;
        } else {
            lhwb.createMessage(message.channel.id, {
                embed: {
                    description: "Music has resumed! - Use !lpause to pause again.",
                    color: 0x00FF5A, // Color, either in hex (show), or a base-10 integer
                    footer : {
                        text: `Requested by: ${message.author.username}`
                    }
                }
            }); 
        }
        paused = false;
        setTimeout(function() { vConnection.resume(); }, 1000);
        log("music resumed?");
    }
}

//variables for handling the skip cooldown
const skipCool = 5 * 1000;
let lastSkip = Date.now() - skipCool;

function skip(msg) {
    if (!skipDisable) {
        if (lastSkip > Date.now() - skipCool) {
            log("Skip cooldown activated.")
            return;
        }

        lastSkip = Date.now();
        stop(null);
        setTimeout(function() { play(null); }, 2000);

        lhwb.createMessage(msg.channel.id, {
            embed: {
                description: "Skipping Song.",
                color: 0x00FF5A, // Color, either in hex (show), or a base-10 integer
                footer : {
                    text: `Requested by: ${msg.author.username}`
                }
            }
        });
    } else {
        lhwb.createMessage(msg.channel.id, {
            embed: {
                description: "Skip is currently disabled.",
                color: 0xFF0000, // Color, either in hex (show), or a base-10 integer
            }
        });
    }
}

function versionCommand(msg) {
    lhwb.createMessage(msg.channel.id, {
        embed: {
            title: "Patch Notes:",
            author: { // Author property
                name: `Version: ${config.discord.version}`,
                icon_url: 'https://red.ghst.in/ts.png'
            },
            description: `${config.discord.patchnotes}`,
            /* fields: [ // Array of field objects
                {
                    name: "Some extra info.", // Field title
                    value: "Some extra value.", // Field
                    inline: true // Whether you want multiple fields in same line
                },
                {
                    name: "Some more extra info.",
                    value: "Another extra value.",
                    inline: true
                }
            ], */
            color: 5218488, // Color, either in hex (show), or a base-10 integer
        }
    });
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
