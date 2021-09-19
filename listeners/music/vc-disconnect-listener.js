const { Listener } = require("discord-akairo");
const { joinVoiceChannel } = require("@discordjs/voice");
const voiceServers = require("../../voice-servers.json");

module.exports = class VcDisconnectListener extends Listener {
	constructor() {
		super("vcDisconnectListener", {
			emitter: "client",
			category: "music",
			event: "voiceStateUpdate",
		});
	}

	async exec(oldState, newState) {
		const channels = voiceServers.map(x => x.channel_id);
		if (!channels.includes(oldState.channelId)) return;
		if (newState.id === this.client.user.id && newState.channelId === null) {
			const channel = this.client.channels.cache.get(oldState.channelId);
			if (!channel) return console.log("I cannot find the voice channel.");
			const connection = joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator,
			});
			connection.state.subscription.player.unpause();
		}
	}
};
