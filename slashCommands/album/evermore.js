const { SlashCommand } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class evermoreCommand extends SlashCommand {
    constructor() {
        super('evermore', {
            name: 'album evermore',
            prefixId: "albumevermore",
            category: "albums",
            commandType: "sub",
            parentCommandName: "album",
            shortCommandName: "evermore",
        });
    }

    async exec(interaction) {

        const embed = new MessageEmbed()
            .setColor(12040119)
            .setAuthor({ 
                name: "Taylor Swift", 
                iconURL: "https://lhwb.dev/ts.png", 
                url: "https://en.wikipedia.org/wiki/Evermore_(Taylor_Swift_album)" 
            })
            .setThumbnail("https://i.imgur.com/YcHPqib.jpg")
            .setDescription("**evermore** was released on __December 11, 2020__ \n\n1. willow\n2. champagne problems\n3. gold rush\n4. 'tis the damn season\n5. tolerate it\n6. no body, no crime (featuring Haim)\n7. happiness\n8. dorothea\n9. coney island (featuring The National)\n10. ivy\n11. cowboy like me\n12. long story short\n13. marjorie\n14. closure\n15. evermore (featuring Bon Iver)\n\nDeluxe\n16. right where you left me\n17. it's time to go");
    
        return interaction.reply({ embeds: [embed] });

    }
}

module.exports = evermoreCommand;
