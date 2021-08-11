const { Listener } = require("discord-akairo");
//const config = require("../../config.json");
const { VoiceConnectionStatus, entersState, getVoiceConnection } = require('@discordjs/voice');

class VCDisconnectListener extends Listener {
    constructor() {
        super("vcDisconnect", {
            event: "voiceStateUpdate",
            emitter: "client"
        });
    }

    exec(oldState, newState) {

        const connection = getVoiceConnection(this.client.guild.id);
        connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
            try {
                await Promise.race([
                    entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                    entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                ]);
                // Seems to be reconnecting to a new channel - ignore disconnect
            } catch (error) {
                // Seems to be a real disconnect which SHOULDN'T be recovered from
                connection.destroy();
            }
        });

        /* if (newState.id === this.client.user.id && newState.connection === null) {
            const channel = this.client.channels.cache.get(config.discord.channelID)
            if (!channel) return console.log("I cannot find the voice channel.")
            function disconnect(client) {
                channel.join()
                    .then(connection => {
                        console.log("Reconnected to voice channel. - Disconnect");
                        const broadcast = client.voice.broadcasts[0]
                        connection.play(broadcast)
                    })
                    .catch(err => {
                        console.log(`Error On Join: ${err}`)
                    })
            }
            setTimeout(disconnect, 5000, this.client)
        } */
    }
}

module.exports = VCDisconnectListener;