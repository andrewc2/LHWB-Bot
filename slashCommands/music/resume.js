const { SlashCommand } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
const { isVoiceServerAndMod } = require("../../utilities/permissions");

class ResumeCommand extends SlashCommand {
    constructor() {
        super('resume', {
            name: 'resume',
            prefixId: "resume",
            category: "music",
            channel: "guild",
            commandType: "command",
            description: "Resumes music on the bot"
        });
    }

    userPermissions(message) {
        return isVoiceServerAndMod(message);
    }

    async exec(interaction) {
        await interaction.deferReply();
        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) {
            return interaction.editReply({ embeds: [
                    new MessageEmbed()
                        .setDescription("Connection to voice channel not found.")
                        .setColor("RED"),
                ],
            });
        }

        const embed = new MessageEmbed()
            .setDescription("Music has been resumed. :play_pause:")
            .setColor("GREEN");

        if (connection.state.subscription.player.state.status === "paused") {
            connection.state.subscription.player.unpause();
            return interaction.editReply({ embeds: [embed] });
        }
        else {
            return interaction.editReply({
                embeds: [
                    embed
                        .setDescription("Music isn't paused at the moment.")
                        .setColor("RED"),
                ],
            });
        }
    }
}

module.exports = ResumeCommand;
