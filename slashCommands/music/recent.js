const { SlashCommand } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { isMusicServer } = require("../../utilities/permissions");
const { db } = require("../../models/db");
const { GET_RECENT } = require("../../models/music-queries");

class RecentCommand extends SlashCommand {
    constructor() {
        super('recent', {
            name: 'recent',
            prefixId: "recent",
            category: "music",
            channel: "guild",
            commandType: "command",
            description: "Shows the 10 most recently played songs"
        });
    }

    userPermissions(message) {
        return isMusicServer(message);
    }

    async exec(interaction) {
        await interaction.deferReply();
        const embed = new MessageEmbed()
            .setColor("#FF69B4")
            .setURL(`https://lhwb.dev/recent.php?server=${interaction.guild.id}`);

        db.query(GET_RECENT, [interaction.guild.id, 11], function(err, result) {
            const playingSong = result[0]["official_name"];
            let recentSongs = "";

            for (let num = 1; num < result.length; num++) {
                // starts with song 1 which was the most recent played before current
                recentSongs = `${recentSongs} ${num}. ${result[num]["official_name"]}\n`;
            }

            embed
                .setTitle(`Currently playing: ${playingSong}`)
                .setDescription(`Recently Played:\n${recentSongs}`);
            return interaction.editReply({ embeds: [embed] });
        });
    }
}

module.exports = RecentCommand;
