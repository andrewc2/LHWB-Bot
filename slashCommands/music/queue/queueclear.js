const { SlashCommand } = require("discord-akairo");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { db } = require("../../../models/db");
const { SEARCH_QUEUE, CLEAR_QUEUE } = require("../../../models/music-queries");
const { cmdRestrictions } = require("../../../utilities/permissions");

class QueueClearCommand extends SlashCommand {
    constructor() {
        super('queueclear', {
            name: 'queue clear',
            prefixId: "clearqueue",
            category: "music",
            channel: "guild",
            commandType: "sub",
            parentCommandName: "queue",
            shortCommandName: "clear",
        });
    }

    async userPermissions(message) {
        return await cmdRestrictions(message);
    }

    async exec(interaction) {
        await interaction.deferReply({ fetchReply: true });
        const embed = new MessageEmbed().setColor("GREEN");

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("clear")
                    .setLabel("Clear")
                    .setStyle("DANGER"),
                new MessageButton()
                    .setCustomId("cancel")
                    .setLabel("Cancel")
                    .setStyle("SECONDARY"),
            );

        db.query(SEARCH_QUEUE, [interaction.guild.id], function(err, result) {
            if (result.length > 0) {
                const buttonEmbed = new MessageEmbed()
                    .setDescription(`${interaction.user}, Are you sure you want to clear the queue?`)
                    .setColor("YELLOW");
                interaction.editReply({ embeds: [buttonEmbed], components: [row] })
                    .then(message => {
                        const filter = async i => {
                            await i.deferUpdate();
                            return i.user.id === interaction.user.id;
                        };
                        message.awaitMessageComponent({ filter, componentType: "BUTTON", time: 10000 })
                            .then(i => {
                                if (i.customId === "clear") {
                                    db.query(CLEAR_QUEUE, [interaction.user.id]);
                                    i.editReply({ embeds: [embed.setDescription("The queue has been cleared 🧹")], components: [] });
                                }
                                else {
                                    i.deleteReply();
                                }
                            })
                            .catch(() => interaction.editReply({ components: [] }));
                    });
            }
            else {
                return interaction.editReply({ embeds: [
                    embed
                        .setDescription("The queue is already empty.")
                        .setColor("RED"),
                ] });
            }
        });

    }
}

module.exports = QueueClearCommand;
