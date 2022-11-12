const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, Colors, ApplicationCommandOptionType } = require('discord.js');
const fetch = require('node-fetch');
const { pagination } = require('../../utilities/pagination');

module.exports = class StoreSlashCommand extends SlashCommand {
  constructor() {
    super('store', {
      name: 'store',
      prefixId: 'store',
      category: 'other',
      commandType: 'command',
      description: 'View items available on Taylor Store',
      slashOptions: [{
        name: 'limit',
        description: 'The number to limit the products to',
        type: ApplicationCommandOptionType.Integer,
        min_value: 5,
        max_value: 250,
      }],
    });
  }

  async exec(interaction, message) {
    await interaction.deferReply({ fetchReply: true });
    const embedArray = [];
    const limit = interaction.options.getInteger('limit') ?? 30;

    fetch(`https://store.taylorswift.com/products.json?limit=${limit}`)
      .then((response) => response.json())
      .then(async (response) => {
        response.products.forEach((item) => {
          embedArray.push(
            new EmbedBuilder()
              .setAuthor({ name: item.vendor })
              .setTitle(item.title)
              .setURL(`https://store.taylorswift.com/products/${item.handle}`)
              .setImage(item.images[0].src)
              .setTimestamp(new Date(item.published_at))
              .setColor(Colors.Gold),
          );
        });
        return await pagination(message, embedArray, true);
      })
      .catch(() => {
        return interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setDescription('Something went wrong while searching Taylor Store. Please try again later.')
              .setColor(Colors.Red),
          ],
        });
      });
  }
};
