const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { commandUsage } = require("../../utilities/utilities");

class TrackInfoCommand extends Command {
	constructor() {
		super("trackinfo", {
			aliases: ["trackinfo", "tinfo"],
			category: "music",
			description: {
				content: "Shows information about a track.",
				usage: "trackinfo [song]",
				examples: [
					"trackinfo evermore",
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
			.setTitle("Track Information")
			.setThumbnail(args.song.album_art_url.toString())
			.addFields(
				{ name: "Name", value: args.song.official_name.toString(), inline: true },
				{ name: "Album", value: args.song.album.toString(), inline: true },
				{ name: "Artist", value: args.song.artist_name.toString(), inline: true },
				{ name: "Track Number", value: args.song.track_number.toString(), inline: true },
				{ name: "Play Count", value: args.song.play_count.toString(), inline: true },
			)
			.setColor("GREEN");

		return message.channel.send({ embeds: [embed] });
	}
}

module.exports = TrackInfoCommand;
