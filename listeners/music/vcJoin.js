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
        const broadcast = this.client.voice.createBroadcast();
        let result = await music.searchQueue() || await music.randomSong();
        channel.join()
            .then(async connection => {
                console.log("Connected to voice channel.")
                connection.play(broadcast)
                setTimeout(function () { music.autoPlay(result, broadcast.client) }, 1000)
            })
    }
}

module.exports = VCJoinListener;