const { Listener } = require("discord-akairo");
const config = require("../../config.json");
const music = require("../../music");

class VCDiscordDisconnectListener extends Listener {
    constructor() {
        super("vcDiscordDisconnect", {
            event: "disconnect",
            emitter: "client"
        });
    }

    async exec() {
        console.log("Discord Disconnect Detected. Trying to reconnect...")
        const channel = this.client.channels.cache.get(config.discord.channelID);
        if (!channel) return console.log("I cannot find the voice channel.");
        const broadcast = this.client.voice.broadcasts[0]
        const result = await music.searchQueue() || await music.randomSong();
        channel.join()
            .then(async connection => {
                console.log("Reconnected to voice channel. - Discord Disconnect")
                connection.play(broadcast)
                setTimeout(function () { music.autoPlay(result, broadcast.client) }, 1000)
            })
    }
}

module.exports = VCDiscordDisconnectListener;