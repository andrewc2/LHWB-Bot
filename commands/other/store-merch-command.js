const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { pagination } = require("../../utilities/pagination");

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

        fetch(`https://store.taylorswift.com/products.json`)
            .then((response) => response.json())
            .then(async (response) => {
                response.products.forEach((item) => {
                    embedArray.push(
                        new MessageEmbed()
                            .setAuthor({ name: item.vendor })
                            .setTitle(item.title)
                            .setURL(`https://store.taylorswift.com/products/${item.handle}`)
                            .setImage(item.images[0].src)
                            .setTimestamp(item.published_at)
                            .setColor('GOLD')
                    )

                });

                await pagination(message, embedArray);
            })
            .catch(() => {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setDescription("Something went wrong while searching Taylor Store. Please try again later.")
                            .setColor("RED")
                    ]
                });
            });
    }
}