const { Listener } = require("discord-akairo");
const config = require("../../config.json");

class VCSwitchListener extends Listener {
    constructor() {
        super("vcSwitch", {
            event: "voiceStateUpdate",
            emitter: "client"
        });
    }

    exec(oldState, newState) {
        if (newState.id === this.client.user.id && newState.channel !== null && newState.channelID !== config.discord.channelID) {
            const channel = this.client.channels.cache.get(config.discord.channelID)
            if (!channel) return console.log("I cannot find the voice channel.")
            function reconnect() {
                console.log("Reconnected to the correct voice channel. - Switch");
                channel.join()
            }
            setTimeout(reconnect, 5000)
        }
    }
}

module.exports = VCSwitchListener;