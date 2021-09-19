const { Command } = require("discord-akairo");
const voiceServers = require("../../voice-servers.json");
const { MessageEmbed } = require("discord.js");
const {	joinVoiceChannel } = require("@discordjs/voice");
const { cmdRestrictionsNoVC } = require("../../utilities/permissions");

class reJoinCommand extends Command {
	constructor() {
		super("rejoin", {
			aliases: ["rejoin"],
			category: "utility",
			cooldown: 30000,
			ratelimit: 1,
			description: {
				content: "Reconnect and resume playing music in default channel.",
				usage: "rejoin",
				examples: [
					"rejoin",
				],
			},
		});
	}

	async userPermissions(message) {
		return await cmdRestrictionsNoVC(message);
	}

	exec(message) {
		const channel = message.client.channels.cache.get(voiceServers.find(x => x.server_id === message.guild.id).channel_id);
		const connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator,
		});
		if (!channel) return console.log("I cannot find the voice channel.");
		connection.state.subscription.player.unpause();
		const embed = new MessageEmbed()
			.setDescription("Automatically reconnecting to the default voice channel.")
			.setColor("#9979FF");
		return message.channel.send({ embeds: [embed] });
	}
}

module.exports = reJoinCommand;
