const { Sequelize } = require("sequelize");
const fs = require("fs");
const db = require("./models/db");
//const database = require("./models/database");
const config = require("./config.json");
const { log } = require("./utilities");


function searchQueue() {
    let song;
    db.promise().query("SELECT COUNT(*) AS total FROM queue")
    .then(([length]) => {
        if(length['0'].total > 0){
            log("There is a queue.");
            db.promise().query("SELECT name, path, queuedby FROM queue").then(([result]) => {
                if(result != null) {
                    const songName = result[0].name;
                    const songPath = result[0].path;
                    const queuedBy = result[0].queuedby;
                    song = { song: songName, path: songPath, queuedBy: queuedBy };
                    log(`Path: ${songPath} Name: ${songName} Queuedby: ${queuedBy} Grabbed from queue`);
                }
            });
        return song
        }
    });

    /* await database.queue.findAll()
        .then(async function (result) {
            if (result.length > 0) {
                const songName = result[0].getDataValue("name")
                const songPath = result[0].getDataValue("path")
                const queuedBy = result[0].getDataValue("queuedby")
                song = { song: songName, path: songPath, queuedBy: queuedBy }
            }
        }) */
}

function randomSong() {
    db.query("SELECT DISTINCT path, name FROM music WHERE type != ? ORDER BY RAND() LIMIT 1",["unreleased"], function(err,result) {
        //gets path from the music db, and randomly selects a released track
        if(result != null) {
            const songPath = result[0].path;
            const songName = result[0].name;
            log(`Path: ${songPath} Name: ${songName} is now playing`);
            fs.access(`${config.discord.music_path}${songPath}`, fs.F_OK, (err) => {
                if (err) {
                    randomSong()
                }
            })
            return { song: songName, path: songPath, queuedBy: null }
        }
    });

    /* const song = await database.music.findOne({ order: [Sequelize.literal("rand()")], limit: 1, where: { type: "released" }})
    const songName = song.getDataValue("name")
    const songPath = song.getDataValue("path")
    fs.access(`${config.discord.music_path}${songPath}`, fs.F_OK, async (err) => {
        if (err) {
            await randomSong()
        }
    }) */
    
}

function updateRecent(name, queuedBy) {
    //Adds recently played songs to database
    db.query("SELECT album FROM music WHERE name = ?",[name], function(err,result) {
        if (err) return log(`Error Updating Recent: ${err} Result: ${result}`);
        let currentAlbum = result[0]['album'];
        db.query("INSERT INTO recent (name, album, queuedby) VALUES (?,?,?)", [name, currentAlbum, queuedBy]);
    });

    /* const album = await database.music.findOne({ where: { name: name }})
    await database.recent.create({ name: name, queuedby: queuedBy, album: album.getDataValue("album") }) */
}

function dequeue(name) {
    db.query("DELETE FROM queue WHERE name = ?", [name]);

    /* const checkQueue = await database.queue.findOne({ where: { name: name }})
    if (checkQueue) {
        await checkQueue.destroy()
    } */
}

function updatePlayCount(path) {
    db.query("UPDATE music SET playcount = playcount + 1 WHERE path = ?",[path])
    //await database.music.update({ playcount: Sequelize.literal(`playcount + ${1}`) }, { where: { name: name }})
}

function autoPlay(result, client) {
    updateRecent(result.song, result.queuedBy);
    const vc = client.channels.cache.get(client.voice.connections.array()[0].channel.id);
    client.user.setActivity(result.song, { type: "LISTENING" });
    const dispatcher = client.voice.broadcasts[0].play(`${config.discord.music_path}${result.path}`, { bitrate: 196000 });
    dispatcher.on("finish", () => {
        if (vc.members.size > 1) {
            updatePlayCount(result.path);
        }
        dequeue(result.song);
        setTimeout(async function () { autoPlay( await searchQueue() || await randomSong(), client) }, 1000);
    })

    /* await updateRecent(result.song, result.queuedBy);
    const vc = client.channels.cache.get(client.voice.connections.array()[0].channel.id);
    await client.user.setActivity(result.song, { type: "LISTENING" });
    const dispatcher = client.voice.broadcasts[0].play(`${config.discord.music_path}${result.path}`, { bitrate: 196000 });
    dispatcher.on("finish", async () => {
        if (vc.members.size > 1) {
            await updatePlayCount(result.path);
        }
        await dequeue(result.song);
        setTimeout(async function () { await autoPlay(await searchQueue() || await randomSong(), client) }, 1000);
    }) */
}

module.exports = { searchQueue, randomSong, dequeue, autoPlay }