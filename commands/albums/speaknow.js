const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class speaknowCommand extends Command {
	constructor() {
		super("speaknow", {
			aliases: ["speaknow"],
			category: "albums",
			description: {
				content: "Displays the track list for Taylor Swift's album Speak Now.",
				usage: "speaknow",
				examples: [
					"speaknow",
				],
			},
		});
	}

	exec(message) {
		const embed = new MessageEmbed()
			.setColor(6892915)
			.setAuthor({ name: "Taylor Swift", iconURL: "https://lhwb.dev/ts.png", url: "https://en.wikipedia.org/wiki/Speak_Now" })
			.setThumbnail("https://i.imgur.com/TNKbt8Y.jpg")
			.setDescription("**Speak Now** was released on __October 25, 2010__ \n\n1. Mine\n2. Sparks Fly\n3. Back to December\n4. Speak Now\n5. Dear John\n6. Mean\n7. The Story of Us\n8. Never Grow Up\n9. Enchanted\n10. Better Than Revenge\n11. Innocent\n12. Haunted\n13. Last Kiss\n14. Long Live\n\n__Deluxe Version__\n15. Ours\n16. If This Was A Movie\n17. Superman");
		message.channel.send({ embeds: [embed] });
	}
}

module.exports = speaknowCommand;
