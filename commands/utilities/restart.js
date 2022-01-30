const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { logger } = require("../../utilities/logging");

class RestartCommand extends Command {
	constructor() {
		super("lrestart", {
			aliases: ["lrestart", "urestart", "umusicrestart"],
			category: "utilities",
			cooldown: 3000,
			ratelimit: 1,
			userPermissions: ["MANAGE_GUILD"],
			description: {
				content: "Restarts the bot",
				usage: "lrestart",
				examples: [
					"lrestart",
				],
			},
		});
	}

	exec(message) {
		logger.log("info", "LHWB is restarting!");
		const embed = new MessageEmbed()
			// red
			.setColor(16711680)
			.setDescription("LHWB user-music restarting!");
		message.channel.send({ embeds: [embed] }).then(() => process.exit(-1));
	}
}

module.exports = RestartCommand;
