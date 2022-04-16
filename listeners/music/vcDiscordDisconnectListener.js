const { Listener } = require("discord-akairo");
const {
	entersState,
	getVoiceConnection,
	VoiceConnectionStatus,
} = require("@discordjs/voice");
const voiceServers = require("../../voice-servers.json");

module.exports = class VcDiscordDisconnect extends Listener {
	constructor() {
		super("vcDiscordDisconnect", {
			emitter: "client",
			category: "music",
			event: "voiceStateUpdate",
		});
	}

	async exec(oldState, newState) {
		if (newState.id !== this.client.user.id) return;
		const channels = voiceServers.map(x => x.channel_id);
		if (!channels.includes(oldState.channelId)) return;
		const connection = getVoiceConnection(newState.guild.id);
		if (!connection) return;

		connection.on(VoiceConnectionStatus.Disconnected, async () => {
			try {
				await Promise.race([
					entersState(
						connection,
						VoiceConnectionStatus.Signalling,
						5_000,
					),
					entersState(
						connection,
						VoiceConnectionStatus.Connecting,
						5_000,
					),
				]);
			}
			catch (error) {
				console.log(error);
				connection.destroy();
			}
		});
	}
};
