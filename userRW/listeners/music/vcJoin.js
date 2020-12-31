const { Listener } = require("discord-akairo");
const config = require("../../config.json");
const music = require("../../music");

class VCJoinListener extends Listener {
    constructor() {
        super("vcJoin", {
            event: "ready",
            emitter: "client"
        });
    }

    async exec() {
        const channel = this.client.channels.cache.get(config.discord.channelID);
        if (!channel) return console.log("I cannot find the voice channel.");
        let result = await music.searchQueue() || await music.randomSong();
        const broadcast = this.client.voice.createBroadcast();
        let dispatcher = broadcast.play(`${config.discord.music_path}${result.path}`, { bitrate: "auto" });
        await this.client.user.setActivity(result.song, { type: "LISTENING" })
        channel.join()
            .then(async connection => {
                console.log("Connected to voice channel.")
                connection.play(broadcast)
                await music.updateRecent(result.song, result.queuedBy);
                dispatcher.on("finish", async () => {
                    await music.updatePlayCount(result.song);
                    await music.dequeue(result.song);
                    result = await music.searchQueue() || await music.randomSong();
                    setTimeout(function () { music.autoPlay(result, dispatcher.broadcast.client) }, 1000)
                })
            })
            .catch(err => {
                console.log(`Error On Join: ${err}`)
            })
    }
}

module.exports = VCJoinListener;