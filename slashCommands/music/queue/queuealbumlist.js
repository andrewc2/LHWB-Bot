const { SlashCommand } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../../models/db");
const { isMusicServer } = require("../../../utilities/permissions");

class QueueAlbumListCommand extends SlashCommand {
    constructor() {
        super('queuealbumlist', {
            name: 'queue album-list',
            prefixId: "queueablealbums",
            category: "music",
            channel: "guild",
            commandType: "sub",
            parentCommandName: "queue",
            shortCommandName: "album-list",
        });
    }

    userPermissions(message) {
        return isMusicServer(message);
    }

    async exec(interaction) {
        await interaction.deferReply();
        db.query("SELECT album FROM song_detail WHERE is_album = 1 GROUP BY album", function(err, result) {
            const queueableAlbums = result.map((x, i = 0) =>
                `${i + 1}. ${x["album"]}`,
            );

            const embed = new MessageEmbed()
                .setColor("#FF69B4")
                .setTitle("Queueable Albums:")
                .setDescription(queueableAlbums.join("\n"))
                .setURL("https://lhwb.dev/lhwb.php");

            return interaction.editReply({ embeds: [embed] });
        });
    }
}

module.exports = QueueAlbumListCommand;
