const { Listener } = require("discord-akairo");
const config = require("../../config.json");
const { joinVoiceChannel } = require('@discordjs/voice');

class VCDisconnectListener extends Listener {
    constructor() {
        super("vcDisconnect", {
            event: "voiceStateUpdate",
            emitter: "client"
        });
    }

    exec(oldState, newState) {
        if (newState.id === this.client.user.id && newState.channelId === null) {
            const channel = this.client.channels.cache.get(config.discord.channelID);
            if (!channel) return console.log("I cannot find the voice channel.");
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            connection.state.subscription.player.unpause();
        }
    }
}

module.exports = VCDisconnectListener;
