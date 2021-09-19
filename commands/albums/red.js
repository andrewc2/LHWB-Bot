const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class redCommand extends Command {
	constructor() {
		super("red", {
			aliases: ["red"],
			category: "albums",
			description: {
				content: "Displays the track list for Taylor Swift's album Red.",
				usage: "red",
				examples: [
					"red",
				],
			},
		});
	}

	exec(message) {
		const embed = new MessageEmbed()
			.setColor(11476553)
			.setAuthor("Taylor Swift", "https://lhwb.dev/ts.png", "https://en.wikipedia.org/wiki/Red_(Taylor%27s_Version)")
		// .setThumbnail("http://i.imgur.com/as6dlgi.jpg")
			.setThumbnail("https://i.imgur.com/gVbp7G0.png")
		// .setDescription("**Red** was released on __October 22, 2012__ \n\n1. State of Grace\n2. Red\n3. Treacherous\n4. I Knew You Were Trouble.\n5. All Too Well\n6. 22\n7. I Almost Do\n8. We Are Never Ever Getting Back Together\n9. Stay Stay Stay\n10. The Last Time (feat. Gary Lightbody)\n11. Holy Ground\n12. Sad Beautiful Tragic\n13. The Lucky One\n14 Everything Has Changed (feat. Ed Sheeran)\n15. Starlight\n16. Begin Again\n\n__Deluxe Version__\n17. The Moment I Knew\n18. Come Back... Be Here\n19. Girl At Home");
			.setDescription("**Red** was released on __October 22, 2012__,\n**Red (Taylor's Version)** was released __November 19, 2021__\n\n1. State of Grace (Taylor’s Version)\n2. Red (Taylor’s Version)\n3. Treacherous (Taylor’s Version)\n4. I Knew You Were Trouble. (Taylor’s Version)\n5. All Too Well (Taylor’s Version)\n6. 22 (Taylor’s Version)\n7. I Almost Do (Taylor’s Version)\n8. We Are Never Ever Getting Back Together (Taylor’s Version)\n9. Stay Stay Stay (Taylor’s Version)\n10. The Last Time (feat. Gary Lightbody) (Taylor’s Version)\n11. Holy Ground (Taylor’s Version)\n12. Sad Beautiful Tragic (Taylor’s Version)\n13. The Lucky One (Taylor’s Version)\n14 Everything Has Changed (feat. Ed Sheeran) (Taylor’s Version)\n15. Starlight (Taylor’s Version)\n16. Begin Again (Taylor’s Version)\n17. The Moment I Knew (Taylor’s Version)\n18. Come Back... Be Here (Taylor’s Version)\n19. Girl At Home (Taylor’s Version)\n20. State Of Grace (Acoustic Version) (Taylor’s Version)\n21. Ronan (Taylor’s Version)\n22. Better Man (From The Vault)\n23. Nothing New (feat. Phoebe Bridgers) (From The Vault)\n24. Babe (From The Vault)\n25. Message In A Bottle (From The Vault)\n26. I Bet You Think About Me (feat. Chris Stapleton) (From The Vault)\n27. Forever Winter (From The Vault)\n28. Run (feat. Ed Sheeran) (From The Vault)\n29. The Very First Night (From The Vault)\n30. All Too Well (10 Minute Version) (From The Vault)");
		message.channel.send({ embeds: [embed] });
	}
}

module.exports = redCommand;
