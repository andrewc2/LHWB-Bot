const fetch = require('node-fetch');
const { Collection, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

const autopostHandler = (client) => {
  const cachedItems = client.taylorStore;
  const channel = client.channels.cache.get(config.storeAutopost.channel_id);
  const whoToPing = config.storeAutopost.who_to_ping_id.map(id => `<@${id}>`);

  fetch('https://store.taylorswift.com/products.json?limit=250')
    .then((response) => response.json())
    .then((response) => {
      const products = new Collection();
      response.products
        .filter(product => product.variants[0].available)
        .map(product =>
          products.set(product.id, {
            id: product.id,
            vendor: product.vendor,
            title: product.title,
            handle: product.handle,
            image: product.images[0].src,
            publishedAt: product.published_at,
          }),
        );

      const newProducts = products.filter(product => !cachedItems.has(product.id));
      if (newProducts.size > 0) {
        newProducts.forEach(product => channel.send({
          content: `${product.title} - **Potential New/Restocked Item** ${whoToPing.join(' ')}`,
          embeds: [
            new EmbedBuilder()
              .setAuthor({ name: product.vendor })
              .setTitle(product.title)
              .setURL(`https://store.taylorswift.com/products/${product.handle}`)
              .setImage(product.image)
              .setTimestamp(new Date(product.publishedAt))
              .setColor(Colors.Gold),
          ],
          components: [
            new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Link)
                  .setLabel('Open Store')
                  .setURL(`https://store.taylorswift.com/products/${product.handle}`),
              ),
          ],
        }));
      }

      client.taylorStore.clear();
      response.products
        .filter(product => product.variants[0].available)
        .map(product => client.taylorStore.set(product.id, product.title));
    });
};

module.exports = { autopostHandler };
