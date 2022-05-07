const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

const previousButton = new MessageButton()
    .setCustomId("previousButton")
    .setLabel("Previous")
    .setStyle("SECONDARY");

const nextButton = new MessageButton()
    .setCustomId("nextButton")
    .setLabel("Next")
    .setStyle("SECONDARY");

const deleteButton = new MessageButton()
    .setCustomId("deleteButton")
    .setLabel("Delete")
    .setStyle("DANGER");

module.exports.pagination = async (message, embedArray, deletable = true) => {

    if (embedArray.length === 0) {
        const notEnoughInfoEmbed = new MessageEmbed()
            .setDescription("There is not enough information for this command to work right now. Try again later.")
            .setColor("RED")
        return message.interaction ?
            message.interaction.editReply({ embeds: [notEnoughInfoEmbed] }) :
            message.channel.send({ embeds: [notEnoughInfoEmbed] })
    }

    const sendPayload = embedArray.length === 1 ?
        deletable === true ?
            { embeds: [embedArray[0]], components: [new MessageActionRow().addComponents(deleteButton)] } :
            { embeds: [embedArray[0]] }
        :
        deletable === true ?
            { embeds: [embedArray[0]], components: [new MessageActionRow().addComponents(previousButton, nextButton, deleteButton)] } :
            { embeds: [embedArray[0]], components: [new MessageActionRow().addComponents(previousButton, nextButton)] };

    const paginationHandler = (sentInteraction) => {
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
            sentInteraction.edit({ components: [] })
                .catch(() => {})
        });
    }

    message.interaction ?
        await message.interaction.editReply(sendPayload)
            .then(message => paginationHandler(message)) :
        message.channel.send(sendPayload)
            .then(message => paginationHandler(message));
}
