const { Listener } = require("discord-akairo");
const { VoiceConnectionStatus, entersState, getVoiceConnection } = require("@discordjs/voice");

class VCDiscordDisconnectListener extends Listener {
    constructor() {
        super("vcDiscordDisconnect", {
            event: "voiceStateUpdate",
            emitter: "client",
        });
    }

    async exec(oldState, newState) {
        if (newState !== this.client.user.id) return;
        const connection = getVoiceConnection(newState.guild.id);
        connection.on(VoiceConnectionStatus.Disconnected, async () => {
            try {
                await Promise.race([
                    entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                    entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                ]);
            }
            catch (error) {
                console.log(error);
                connection.destroy();
            }
        });
    }
}

module.exports = VCDiscordDisconnectListener;
