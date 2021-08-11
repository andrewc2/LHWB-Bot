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

        if (newState.id === this.client.user.id && newState.connection === null) {
            const connection = getVoiceConnection(oldState.guild.id);

            connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
                try {
                    await Promise.race([
                        entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                        entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                    ]);
                    // Seems to be reconnecting to a new channel - ignore disconnect
                } catch (error) {
                    // Seems to be a real disconnect which SHOULDN'T be recovered from
                    console.log(error);
                    connection.destroy();
                }
            });
        }
    }
}

module.exports = VCDisconnectListener;