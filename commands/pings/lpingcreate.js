const { Command, Argument } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { commandUsage, anyUsage } = require("../../utilities/utilities");

class LPingCreateCommand extends Command {
	constructor() {
		super("lpingcreate", {
			aliases: ["lping create"],
			category: "ping",
			channel: "guild",
			userPermissions: ["MANAGE_MESSAGES"],
			description: {
				content: "Create a new pinglist for a server.",
				usage: "lping [name]",
				examples: [
					"lping chase",
				],
			},
			args: [
				{
					id: "name",
					type: Argument.range("lowercase", 0, 45, true),
					otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
				},
			],
		});
	}

	exec(message, args) {
		const failedEmbed = new MessageEmbed()
			.setColor("RED")
			.setDescription(`Uh oh! Looks like this pinglist already exists.\nYou can view available pinglists in this server by doing ${anyUsage(message.guild, message.client, "lping list")} or /lping list`);

		const embed = new MessageEmbed()
			.setColor("#FF69B4")
			.setDescription("Successfully created the pinglist.");

		db.query("SELECT * FROM `Ping` WHERE `name` = ? AND `guildID` = ?", [args.name, message.guild.id], function(err, result) {
			if (err) return;
			for (const ping of result.values()) {
				if (ping.name === args.name) return message.channel.send({ embeds: [failedEmbed] });
			}
			db.query("INSERT INTO `Ping` (`name`, `guildID`) VALUES (?,?)", [args.name, message.guild.id]);
			return message.channel.send({ embeds: [embed] });
		});
	}
}

module.exports = LPingCreateCommand;
