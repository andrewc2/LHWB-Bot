const { SlashCommand } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { isMusicServer } = require("../../utilities/permissions");
const { db } = require("../../models/db");
const { GET_RECENT } = require("../../models/music-queries");

class CurrentCommand extends SlashCommand {
    constructor() {
        super('current', {
            name: 'current',
            prefixId: "current",
            category: "music",
            channel: "guild",
            commandType: "command",
            description: "Shows what song is currently playing"
        });
    }

    userPermissions(message) {
        return isMusicServer(message);
    }

    async exec(interaction) {
        await interaction.deferReply();
        const embed = new MessageEmbed().setColor("#FF69B4");

        db.query(GET_RECENT, [interaction.guild.id, 1], function(err, result) {
            const currentAlbum = result[0]["album"];
            const currentSong = result[0]["official_name"];
            const artistName = result[0]["artist_name"];
            const queuedBy = result[0]["queued_by"];
            const albumArt = result[0]["album_art_url"];

            embed
                .setTitle(currentSong)
                .setDescription(`${currentAlbum} - ${artistName}`)
                .setThumbnail(albumArt);

            if (queuedBy) embed.setFooter({ text: `Queued by: ${queuedBy}` });
            return interaction.editReply({ embeds: [embed] });
        });
    }
}

module.exports = CurrentCommand;
