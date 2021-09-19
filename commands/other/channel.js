const { Command, Flag } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class ChannelCommand extends Command {
	constructor() {
		super("channel", {
			aliases: ["channel"],
			category: "other",
			channel: "guild",
			userPermissions: ["MANAGE_GUILD"],
			description: {
				content: "Use `channel disable` or `channel enable` to change a commands behaviour in a channel.",
				usage: "channel <enable|disable> <command>",
				examples: [
					"channel enable lping",
				],
			},
		});
	}

	*args() {
		const method = yield {
			type: [
				["channelenable", "enable"],
				["channeldisable", "disable"],
			],
		};

		if (method) return Flag.continue(method, true);
	}

	exec(message) {
		const failedEmbed = new MessageEmbed()
			.setColor("RED");

		return message.channel.send({ embeds: [failedEmbed.setDescription("Please consult the help guide to use this command. :smiley:")] });
	}
}

module.exports = ChannelCommand;
