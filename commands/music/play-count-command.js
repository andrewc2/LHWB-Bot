const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { commandUsage } = require("../../utilities/utilities");

class PlayCountCommand extends Command {
	constructor() {
		super("playcount", {
			aliases: ["playcount", "pc"],
			category: "music",
			description: {
				content: "Shows play count for a track.",
				usage: "playcount [song]",
				examples: [
					"playcount evermore",
				],
			},
			args: [
				{
					id: "song",
					type: "song",
					match: "content",
					otherwise: message => commandUsage(this.aliases[0], message.guild, message.client, this.description.usage),
				},
			],
		});
	}

	async exec(message, args) {
		const embed = new MessageEmbed()
			.setTitle("Track Play Count")
			.setThumbnail(args.song.album_art_url.toString())
			.addFields(
				{ name: "Name", value: args.song.official_name.toString(), inline: true },
				{ name: "Play Count", value: args.song.play_count.toString(), inline: true },
			)
			.setColor("PURPLE");

		return message.channel.send({ embeds: [embed] });
	}
}

module.exports = PlayCountCommand;
