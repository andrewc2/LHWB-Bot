const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class beautifuleyesCommand extends Command {
    constructor() {
        super("beautifuleyes", {
            aliases: ["beautifuleyes"],
            category: "albums",
            description: {
                content: "Displays the track list for Taylor Swift's EP Beautiful Eyes.",
                usage: "beautifuleyes",
                examples: [
                    "beautifuleyes"
                ]
            }
        });
    }

    exec(message) {
        const embed = new MessageEmbed()
            .setColor(0xe78234)
            .setAuthor("Taylor Swift", "https://lhwb.dev/ts.png", "https://en.wikipedia.org/wiki/Beautiful_Eyes")
            .setThumbnail("https://i.imgur.com/sN5DToG.jpg")
            .setDescription("**Beautiful Eyes** was released on __July 15, 2008__ \n\n1. Beautiful Eyes\n2. Should've Said No (Alternate version)\n3. Teardrops on My Guitar (Acoustic version)\n4. Picture to Burn (Radio edit)\n5. I'm Only Me When I'm with You\n6. I Heart ?\n\n__Disk Two (DVD)__\n1. Beautiful Eyes (music video)\n2. Picture to Burn (music video)\n3. I'm Only Me When I'm with You (music video)\n4. Tim McGraw (music video)\n5. Teardrops on My Guitar (Pop version music video)\n6. Our Song (music video)\n7. Making of 'Picture to Burn' Video\n8. GAC New Artist Interview\n9. 2008 ACM Awards Performance of 'Should've Said No");
        message.channel.send({ embeds: [embed] })
    }
}

module.exports = beautifuleyesCommand;