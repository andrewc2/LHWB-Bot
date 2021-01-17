const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class fearlessCommand extends Command {
    constructor() {
        super("fearless", {
            aliases: ["fearless"],
            category: "albums",
            description: {
                content: "Displays the track list for Taylor Swift's album Fearless.",
                usage: "fearless",
                examples: [
                    "fearless"
                ]
            }
        });
    }

    exec(message) {
        const embed = new MessageEmbed()
            .setColor(14929032)
            .setAuthor("Taylor Swift", "https://lhwb.dev/ts.png", "https://en.wikipedia.org/wiki/Fearless_(Taylor_Swift_album)")
            .setThumbnail("https://i.imgur.com/TPL7mge.jpg")
            .setDescription("**Fearless** was released on __November 11, 2008__ \n\n1. Fearless\n2. Fifteen\n3. Love Story\n4. Hey Stephen\n5. White Horse\n6. You Belong with Me\n7. Breathe (featuring Colbie Caillat)\n8. Tell Me Why\n9. You're Not Sorry\n10. The Way I Loved You\n11. Forever and Always\n12. The Best Day\n13. Change\n\n__Platinum Edition Tracks:__\nJump Then Fall\nUntouchable\nCome in with the Rain\nSuperstar\nThe Other Side of the Door\nForever And Always (Piano Version)");
        message.channel.send({embed})
    }
}

module.exports = fearlessCommand;