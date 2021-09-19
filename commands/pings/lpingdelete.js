const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { commandUsage, anyUsage } = require("../../utilities/utilities");

class LPingDeleteCommand extends Command {
	constructor() {
		super("lpingdelete", {
			aliases: ["lping delete"],
			category: "ping",
			channel: "guild",
			userPermissions: ["MANAGE_MESSAGES"],
			description: {
				content: "Deletes a pinglist in a server.",
				usage: "lping [name]",
				examples: [
					"lping chase",
				],
			},
			args: [
				{
					id: "name",
					type: "lowercase",
					otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
				},
			],
		});
	}

	exec(message, args) {
		const failedEmbed = new MessageEmbed()
			.setColor("RED")
			.setDescription(`Uh oh! Looks like this pinglist does not exist.\nYou can can view available pinglists in this server by doing ${anyUsage(message.guild, message.client, "lping list")}`);

		const embed = new MessageEmbed()
			.setColor("#FF69B4")
			.setDescription("Successfully deleted the pinglist.");

		db.query("SELECT * FROM `Ping` WHERE `name` = ? AND `guildID` = ?", [args.name, message.guild.id], function(err, result) {
			if (err) return;
			if (result.length < 1) return message.channel.send({ embeds: [failedEmbed] });
			db.query("DELETE FROM `Ping` WHERE name = ? AND guildID = ?", [args.name, message.guild.id]);
			return message.channel.send({ embeds: [embed] });
		});
	}
}

module.exports = LPingDeleteCommand;
