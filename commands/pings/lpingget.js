const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { commandUsage, anyUsage } = require("../../utilities/utilities");

class LPingGetCommand extends Command {
	constructor() {
		super("lpingget", {
			aliases: ["lping get"],
			category: "ping",
			channel: "guild",
			description: {
				content: "Add user to the specified pinglist.",
				usage: "lping get [name]",
				examples: [
					"lping get chase",
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
			.setDescription(`Uh oh! Looks like this pinglist does not exist.\nYou can view available pinglists in this server by doing ${anyUsage(message.guild, message.client, "lping list")}`);

		const embed = new MessageEmbed()
			.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true, format: "png" }), url: message.author.displayAvatarURL({ dynamic: true, format: "png" }) })
			.setColor("#FF69B4");

		db.query("SELECT `name`, `guildID` FROM Ping WHERE name = ? AND guildID = ?", [args.name, message.guild.id], function(err, result) {
			if (err) return;
			if (result.length < 1) return message.channel.send({ embeds: [failedEmbed] });
			db.query("SELECT u.userID, p.pingID, p.name FROM User as u INNER JOIN UserPing as up ON u.userID = up.userID INNER JOIN Ping as p ON p.pingID = up.pingID WHERE p.guildID = ? AND up.userID = ? AND p.name = ?", [message.guild.id, message.author.id, args.name], function(err, result) {
				if (result.length > 0) return message.channel.send({ embeds: [failedEmbed.setDescription(`You are already apart of the ${result[0].name} pinglist in this server.`)] });
				db.query("INSERT INTO UserPing (userID, pingID) SELECT u.userID, p.pingID FROM User as u, Ping as p WHERE u.userID = ? AND p.name = ? AND p.guildID = ?", [message.author.id, args.name, message.guild.id]);
				return message.channel.send({ embeds: [embed.setDescription(`You have been successfully added to the ${args.name} pinglist.`)] });
			});
		});
	}
}

module.exports = LPingGetCommand;
