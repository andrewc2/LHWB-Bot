const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { logger } = require("../../utilities/logging");
const { commandUsage } = require("../../utilities/utilities");

class LastFMSetCommand extends Command {
	constructor() {
		super("lfmset", {
			aliases: ["lfm set"],
			category: "fm",
			description: {
				content: "Sets your lastfm profile.",
				usage: "lfm set [last.fm]",
				examples: [
					"lfm set iAndrewC",
				],
			},
			args: [
				{
					id: "username",
					type: "string",
					otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
				},
			],
		});
	}

	exec(message, args) {
		db.query("INSERT INTO lastfm (lastfmUsername, discordTag, discordID) VALUES (?,?,?) " + "ON DUPLICATE KEY UPDATE lastfmUsername=?, discordTag=?", [args.username, message.author.tag, message.author.id, args.username, message.author.tag], function(err) {
			if (err) logger.log("error", err);
		});
		const embed = new MessageEmbed()
			.setColor("#FF69B4")
			.setDescription(`Your last.fm username has been set to ${args.username}.`);
		message.channel.send({ embeds: [embed] });
	}
}

module.exports = LastFMSetCommand;
