const { Sequelize } = require("sequelize");
const fs = require("fs");
const database = require("./models/database");
const config = require("./config.json");

async function searchQueue() {
    let song
    await database.queue.findAll()
        .then(async function (result) {
            if (result.length > 0) {
                const songName = result[0].getDataValue("name")
                const songPath = result[0].getDataValue("path")
                const queuedBy = result[0].getDataValue("queuedby")
                song = { song: songName, path: songPath, queuedBy: queuedBy }
            }
        })
    return song
}

async function randomSong() {
    const song = await database.music.findOne({ order: [Sequelize.literal("rand()")], limit: 1, where: { type: "released" }})
    const songName = song.getDataValue("name")
    const songPath = song.getDataValue("path")
    fs.access(`${config.discord.music_path}${songPath}`, fs.F_OK, async (err) => {
        if (err) {
            await randomSong()
        }
    })
    return { song: songName, path: songPath, queuedBy: null }
}

async function updateRecent(name, queuedBy) {
    const album = await database.music.findOne({ where: { name: name }})
    await database.recent.create({ name: name, queuedby: queuedBy, album: album.getDataValue("album") })
}

async function dequeue(name) {
    const checkQueue = await database.queue.findOne({ where: { name: name }})
    if (checkQueue) {
        await checkQueue.destroy()
    }
}

async function updatePlayCount(name) {
    await database.music.update({ playcount: Sequelize.literal(`playcount + ${1}`) }, { where: { name: name }})
}

async function autoPlay(result, client) {
    await updateRecent(result.song, result.queuedBy);
    await client.user.setActivity(result.song, { type: "LISTENING" })
    const dispatcher = client.voice.broadcasts[0].play(`${config.discord.music_path}${result.path}`, { bitrate: 192000 });
    dispatcher.on("finish", async () => {
        await updatePlayCount(result.song);
        await dequeue(result.song);
        setTimeout(async function () { await autoPlay(await searchQueue() || await randomSong(), client) }, 1000)
    })
}

module.exports = { searchQueue, randomSong, updateRecent, dequeue, updatePlayCount, autoPlay }