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
                    "red"
                ]
            }
        });
    }

    exec(message) {
        const embed = new MessageEmbed()
            .setColor(11476553)
            .setAuthor("Taylor Swift", "https://lhwb.dev/ts.png", "https://en.wikipedia.org/wiki/Red_(Taylor_Swift_album)")
            .setThumbnail("http://i.imgur.com/as6dlgi.jpg")
            .setDescription("**Red** was released on __October 22, 2012__ \n\n1. State of Grace\n2. Red\n3. Treacherous\n4. I Knew You Were Trouble.\n5. All Too Well\n6. 22\n7. I Almost Do\n8. We Are Never Ever Getting Back Together\n9. Stay Stay Stay\n10. The Last Time (featuring Gary Lightbody)\n11. Holy Ground\n12. Sad Beautiful Tragic\n13. The Lucky One\n14 Everything Has Changed (featuring Ed Sheeran)\n15. Starlight\n16. Begin Again\n\n__Deluxe Version__\n17. The Moment I Knew\n18. Come Back... Be Here\n19. Girl At Home");
        message.channel.send({embed})
    }
}

module.exports = redCommand;