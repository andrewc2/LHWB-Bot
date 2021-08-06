const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class WT1989SetlistCommand extends Command {
    constructor() {
        super("1989setlist", {
            aliases: ["1989setlist"],
            category: "tours",
            description: {
                content: "Displays the setlist for Taylor Swift's 1989 Tour.",
                usage: "1989setlist",
                examples: [
                    "1989setlist"
                ]
            }
        });
    }

    exec(message) {
        const embed = new MessageEmbed()
            .setColor(568027)
            .setAuthor("Typical 1989 World Tour Setlist", "https://lhwb.dev/ts.png", "https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=3d0a56f")
            .setThumbnail("https://i.imgur.com/tIO68fu.jpg")
            .setDescription("1. Welcome to New York\n2. New Romantics\n3. Blank Space\n4. I Knew You Were Trouble (Rock Version)\n5. I Wish You Would\n6. How You Get the Girl\n7. I Know Places\n8. All You Had to Do Was Stay or Fifteen or You Belong With Me (some cities got two of these)\n9. Special Guest (!1989guests) / Some cities got Wonderland\n10. You Are In Love (Acoustic - some early cities)\n11. Clean\n12. Love Story (Synth Version)\n13. Style\n14. This Love\n15. Bad Blood\n16. We Are Never Ever Getting Back Together (Rock Version)\n17. Enchanted / Wildest Dreams\n18. Out of the Woods\n19. Shake It Off");
        message.channel.send({embed})
    }
}

module.exports = WT1989SetlistCommand;