const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class folkloreCommand extends Command {
    constructor() {
        super("folklore", {
            aliases: ["folklore"],
            category: "albums",
            description: {
                content: "Displays the track list for Taylor Swift's album folklore.",
                usage: "folklore",
                examples: [
                    "folklore"
                ]
            }
        });
    }

    exec(message) {
        const embed = new MessageEmbed()
            .setColor(12040119)
            .setAuthor("Taylor Swift", "https://lhwb.dev/ts.png", "https://en.wikipedia.org/wiki/Folklore_(Taylor_Swift_album)")
            .setThumbnail("https://i.imgur.com/oZvDEky.jpg")
            .setDescription("**folklore** was released on __July 24, 2020__ \n\n1. the 1\n2. cardigan\n3. the last great american dynasty\n4. exile (featuring Bon Iver)\n5. my tears ricochet\n6. mirrorball\n7. seven\n8. august\n9. this is me trying\n10. illicit affairs\n11. invisible string\n12. mad woman\n13. epiphany\n14. betty\n15. peace\n16. hoax\n\nDeluxe\n17. the lakes");
        message.channel.send({embed})
    }
}

module.exports = folkloreCommand;