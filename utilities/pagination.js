const { MessageActionRow, MessageButton } = require("discord.js");

const buttons = new MessageActionRow().addComponents(
    new MessageButton()
        .setCustomId("previousButton")
        .setLabel("Previous")
        .setStyle("SECONDARY"),
    new MessageButton()
        .setCustomId("nextButton")
        .setLabel("Next")
        .setStyle("SECONDARY"),
    new MessageButton()
        .setCustomId("deleteButton")
        .setLabel("Delete")
        .setStyle("DANGER")
);

module.exports.pagination = async (message, embedArray) => {
    await message.channel
        .send({embeds: [embedArray[0]], components: [buttons]})
        .then((sentInteraction) => {
            let i = 0;

            const filter = async (interaction) => {
                await interaction.deferUpdate();
                return interaction.user.id === message.author.id;
            };

            const collector =
                sentInteraction.createMessageComponentCollector({
                    filter,
                    idle: 20000,
                });

            collector.on("collect", (interaction) => {
                    if (interaction.customId === "deleteButton") {
                        interaction.deleteReply();
                    } else if (interaction.customId === "nextButton") {
                        i++;
                        if (i >= embedArray.length) i = 0;
                        interaction.editReply({
                            embeds: [embedArray[i]],
                        });
                    } else {
                        i--;
                        if (i < 0) i = embedArray.length - 1;
                        interaction.editReply({
                            embeds: [embedArray[i]],
                        });
                    }
                }
            );

            collector.on("end", () => {
                sentInteraction.edit({components: []});
            });
        });
}
