const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class repGuestsCommand extends Command {
	constructor() {
		super("repguests", {
			aliases: ["repguests", "reputationguests"],
			category: "tours",
			description: {
				content: "Displays the guest list on Taylor Swift's reputation Tour.",
				usage: "repguests",
				examples: [
					"repguests",
				],
			},
		});
	}

	exec(message) {
		const embed = new MessageEmbed()
			.setColor(568027)
			.setAuthor({
				name: "Special Guests",
				iconURL: "https://lhwb.dev/ts.png",
				url: "https://en.wikipedia.org/wiki/Taylor_Swift%27s_Reputation_Stadium_Tour#Shows"
			})
			.setThumbnail("https://i.imgur.com/Zhg0oXF.jpg")
			.setDescription("5-18-18 (Pasadena) There's Nothing Holdin' Me Back - Shawn Mendes\n5-19-18 (Pasadena) My My My! - Troye Sivan; Hands to Myself - Selena Gomez\n6-22-18 (London) Slow Hands - Niall Horan\n6-23-18 (London) Angels - Robbie Williams\n7-27-18 (Foxborough) Curious - Hayley Kiyoko\n8-04-18 (Toronto) Summer of 69 - Bryan Adams\n8-25-18 (Nashville) Tim McGraw - Faith Hill / Tim McGraw\n10-5-18 (Dallas) The Middle - Maren Morris\n10-6-18 (Dallas) Sugarland - Babe [full production]");
		message.channel.send({ embeds: [embed] });
	}
}

module.exports = repGuestsCommand;
