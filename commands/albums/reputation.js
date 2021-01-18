const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class reputationCommand extends Command {
    constructor() {
        super("reputation", {
            aliases: ["reputation","rep"],
            category: "albums",
            description: {
                content: "Displays the track list for Taylor Swift's album reputation.",
                usage: "reputation",
                examples: [
                    "reputation"
                ]
            }
        });
    }

    exec(message) {
        const embed = new MessageEmbed()
            .setColor(12040119)
            .setAuthor("Taylor Swift", "https://lhwb.dev/ts.png", "https://en.wikipedia.org/wiki/Reputation_(Taylor_Swift_album)")
            .setThumbnail("https://i.imgur.com/o2v3b7E.jpg")
            .setDescription("**reputation** was released on __November 10, 2017__ \n\n1. ...Ready For It?\n2. End Game (ft. Ed Sheeran and Future)\n3. I Did Something Bad\n4. Don't Blame Me\n5. Delicate\n6. Look What You Made Me Do\n7. So It Goes...\n8. Gorgeous\n9. Getaway Car\n10. King Of My Heart\n11. Dancing With Our Hands Tied\n12. Dress\n13. This Is Why We Can't Have Nice Things\n14. Call It What You Want\n15. New Year's Day");
        message.channel.send({embed})
    }
}

module.exports = reputationCommand;