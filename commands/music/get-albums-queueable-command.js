const { Argument, Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { isMusicServer } = require("../../utilities/permissions");

module.exports = class QueueableAlbumsCommand extends Command {
	constructor() {
		super("queueablealbums", {
			aliases: ["queueablealbums", "albumlist"],
			category: "music",
			description: {
				content: "Shows which albums are setup for use with the queue album command.",
				usage: "queueablealbums",
				examples: ["queueablealbums"],
			},
			args: [
				{
					id: "listNum",
					type: Argument.range("number", 5, 25, true),
					default: 5,
				},
			],
		});
	}

	userPermissions(message) {
		return isMusicServer(message);
	}

	async exec(message) {
		db.query("SELECT album FROM song_detail WHERE is_album = 1 GROUP BY album", function(err, result) {
			const queueableAlbums = result.map(
				(x, i = 0) =>
					`${i + 1}. ${x["album"]}`,
			);

			const embed = new MessageEmbed()
				.setColor("#FF69B4")
				.setTitle("Queueable Albums:")
				.setDescription(queueableAlbums.join("\n"))
				.setURL("https://lhwb.dev/lhwb.php");

			return message.channel.send({ embeds: [embed] });
		},
		);
	}
};
