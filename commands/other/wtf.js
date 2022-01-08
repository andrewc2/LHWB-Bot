const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { anyUsageFooter } = require("../../utilities/utilities");

class wtfCommand extends Command {
	constructor() {
		super("wtf", {
			aliases: ["wtf"],
			category: "other",
			description: {
				content: "Displays a random saved !g wtf.",
				usage: "wtf",
				examples: [
					"wtf",
				],
			},
		});
	}

	exec(message) {
		db.query("SELECT path, type FROM media WHERE type = 'wtf' ORDER BY RAND() LIMIT 1", function(err, rows) {
			const embed = new MessageEmbed()
				.setColor("#FF69B4")
				.setImage(`${rows[0].path}`)
				.setFooter(`Submit !g wtf's be added using: ${anyUsageFooter(message.guild, message.client, "request wtf [imgur url]")}`, message.client.user.displayAvatarURL({ dynamic: true, format: "png" }));
			message.channel.send({ embeds: [embed] });
		});
	}
}

module.exports = wtfCommand;
