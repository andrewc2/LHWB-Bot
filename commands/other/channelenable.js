const { Command } = require("discord-akairo");
const { db } = require("../../models/db");
const { MessageEmbed } = require("discord.js");
const { commandUsage, anyUsage } = require("../../utilities/utilities");

class ChannelEnable extends Command {
	constructor() {
		super("channelenable", {
			aliases: ["channel enable"],
			category: "other",
			description: {
				content: "Enable a command in a channel.",
				usage: "channel enable <command>",
				examples: [
					"channel enable lping",
				],
			},
			args: [
				{
					id: "command",
					type: "commandAlias",
					match: "content",
					otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
				},
			],
		});
	}

	exec(message, args) {
		const failedEmbed = new MessageEmbed()
			.setColor("RED");

		const embed = new MessageEmbed()
			.setColor("#FF69B4");

		const guildID = message.guild.id;
		const channelID = message.channel.id;
		const commandID = args.command.id;

		db.query("SELECT * FROM `command` WHERE `guildID` = ? AND `channelID` = ? AND `commandID` = ?", [guildID, channelID, commandID], function(err, result) {
			if (err) return;
			if (result.length < 1) {
				return message.channel.send({ embeds: [failedEmbed.setDescription(`Command is not disabled. :smiley:\nTo disable use ${anyUsage(message.guild, message.client, "channel disable commandName")}`)] });
			}
			else {
				db.query("DELETE FROM `command` WHERE `guildID` = ? AND `channelID` = ? AND `commandID` = ?", [guildID, channelID, commandID]);
				return message.channel.send({ embeds: [embed.setDescription(`Command has been enabled. :smiley:\nTo disable use ${anyUsage(message.guild, message.client, "channel disable commandName")}`)] });
			}
		});
	}
}

module.exports = ChannelEnable;
