const { Command } = require("discord-akairo");

class tazeCommand extends Command {
	constructor() {
		super("taze", {
			aliases: ["taze"],
			category: "other",
			description: {
				content: "Sends a :cloud_lightning: to chat.",
				usage: "taze",
				examples: [
					"taze",
				],
			},
		});
	}

	exec(message) {
		message.channel.send(":cloud_lightning:");
	}
}

module.exports = tazeCommand;
