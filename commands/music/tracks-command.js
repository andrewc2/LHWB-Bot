const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

module.exports = class TracksCommand extends Command {
	constructor() {
		super("tracks", {
			aliases: ["tracks", "track", "tracklist"],
			category: "music",
			description: {
				content: "Adds a song to the music queue.",
				usage: "queue [song]",
				examples: ["queue Red"],
			},
		});
	}

	async exec(message) {
		const embed = new MessageEmbed()
			.setAuthor({
				name: `${message.client.user.username} TrackList`,
				iconURL: message.client.user.displayAvatarURL({ dynamic: true, format: "png" }),
				url: message.client.user.displayAvatarURL({ dynamic: true, format: "png" })
			})
			.setDescription("The full requestable track list is here: https://lhwb.dev/lhwb.php")
			.setColor("#9979FF");
		return message.channel.send({ embeds: [embed] });
	}
};
