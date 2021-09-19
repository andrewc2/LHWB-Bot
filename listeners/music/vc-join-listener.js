const { Listener } = require("discord-akairo");
const { joinVoiceChannel } = require("@discordjs/voice");
const { play, randomSong, searchQueue } = require("../../music");
const voiceServers = require("../../voice-servers.json");

module.exports = class VcJoinListener extends Listener {
	constructor() {
		super("vcJoinListener", {
			emitter: "client",
			category: "music",
			event: "ready",
		});
	}

	async exec() {
		for (const servers of voiceServers.values()) {
			const channel = this.client.channels.cache.get(servers.channel_id);

			const connection = joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator,
			});

			const result = await searchQueue(channel.guild) || await randomSong(channel.guild);
			this.client.user.setActivity("Music", { type: "PLAYING" });
			setTimeout(() => { play(result, connection, this.client); }, 1000);
		}
	}
};
