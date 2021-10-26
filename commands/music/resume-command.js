const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
const { isVoiceServerAndMod } = require("../../utilities/permissions");

module.exports = class ResumeCommand extends Command {
	constructor() {
		super("resume", {
			aliases: ["resume", "play", "lresume"],
			category: "music",
			description: {
				content: "Resumes music on the bot.",
				usage: "resume",
				examples: ["resume"],
			},
			channel: "guild",
		});
	}

	userPermissions(message) {
		return isVoiceServerAndMod(message);
	}

	async exec(message) {
		const connection = getVoiceConnection(message.guild.id);

		if (!connection) {
			return message.channel.send({ embeds: [
				new MessageEmbed()
					.setDescription("Connection to voice channel not found.")
					.setColor("RED"),
			] });
		}

		const embed = new MessageEmbed()
			.setDescription("Music has been resumed. :play_pause:")
			.setColor("GREEN");

		if (connection.state.subscription.player.state.status === "paused") {
			connection.state.subscription.player.unpause();
			return message.channel.send({ embeds: [embed] });
		}
		else {
			return message.channel.send({
				embeds: [
					embed
						.setDescription("Music isn't paused at the moment.")
						.setColor("RED"),
				],
			});
		}
	}
};
