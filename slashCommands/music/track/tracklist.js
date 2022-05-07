const { SlashCommand } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { isVoiceServer } = require("../../../utilities/permissions");

class TrackListCommand extends SlashCommand {
    constructor() {
        super('tracklist', {
            name: 'track list',
            prefixId: "tracks",
            category: "music",
            channel: "guild",
            commandType: "sub",
            parentCommandName: "track",
            shortCommandName: "list",
        });
    }

    userPermissions(message) {
        if (isVoiceServer(message.guild.id)) return "Server";
    }

    async exec(interaction) {
        const embed = new MessageEmbed()
            .setAuthor({
                name: `${interaction.client.user.username} TrackList`,
                iconURL: interaction.client.user.displayAvatarURL({ dynamic: true, format: "png" }),
                url: interaction.client.user.displayAvatarURL({ dynamic: true, format: "png" })
            })
            .setDescription("The full requestable track list is here: https://lhwb.dev/lhwb.php")
            .setColor("#9979FF");
        return interaction.reply({ embeds: [embed] });
    }
}

module.exports = TrackListCommand;
