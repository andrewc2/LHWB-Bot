const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { GET_RECENT } = require("../../models/music-queries");
const { isMusicServer } = require("../../utilities/permissions");

module.exports = class RecentCommand extends Command {
	constructor() {
		super("recent", {
			aliases: ["recent"],
			category: "music",
			description: {
				content: "Shows the 10 most recently played songs.",
				usage: "recent",
				examples: ["recent"],
			},
			channel: "guild",
		});
	}

	userPermissions(message) {
		return isMusicServer(message);
	}

	async exec(message) {
		const embed = new MessageEmbed()
			.setColor("#FF69B4")
			.setURL(`https://lhwb.dev/recent.php?server=${message.guild.id}`);

		db.query(GET_RECENT, [message.guild.id, 11], function(err, result) {
			const playingSong = result[0]["official_name"];
			let recentSongs = "";

			for (let num = 1; num < result.length; num++) {
				// starts with song 1 which was the most recent played before current
				recentSongs = `${recentSongs} ${num}. ${result[num]["official_name"]}\n`;
			}

			embed
				.setTitle(`Currently playing: ${playingSong}`)
				.setDescription(`Recently Played:\n${recentSongs}`);
			return message.channel.send({ embeds: [embed] });
		},
		);
	}
};
