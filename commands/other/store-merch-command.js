const { Command } = require('discord-akairo');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class StoreCommand extends Command {
    constructor() {
        super('store', {
            aliases: ['store'],
            category: 'utility',
            description: {
                content: 'View items available on Taylor Store.',
                usage: 'store',
                examples: ['store'],
            },
        });
    }

    exec(message) {
        const embedArray = [];

        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('previousButton')
                .setLabel('Previous')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('nextButton')
                .setLabel('Next')
                .setStyle('SECONDARY')
        );

        fetch(`https://store.taylorswift.com/products.json`)
            .then((response) => response.json())
            .then(async (response) => {
                response.products.forEach((item) => {
                    embedArray.push(
                        new MessageEmbed()
                            .setAuthor(item.vendor)
                            .setTitle(item.title)
                            .setURL(`https://store.taylorswift.com/products/${item.handle}`)
                            .setImage(item.images[0].src)
                            .setTimestamp(item.published_at)
                            .setColor('GOLD')
                    )
                            
                });

                return message.channel
                    .send({ embeds: [embedArray[0]], components: [buttons] })
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

                        collector.on('collect', (interaction) => {
                                if (interaction.customId === 'nextButton') {
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

                        collector.on('end', () => {
                            sentInteraction.edit({ components: [] });
                        });
                    });
            });
    }
}