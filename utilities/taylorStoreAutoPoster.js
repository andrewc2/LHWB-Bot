const fetch = require('node-fetch');
const { Collection, EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle, roleMention } = require('discord.js');
const { logger } = require('./winstonLogging');

class TaylorStoreAutoPoster {

  constructor(client, countryCode, url, channelId, roleId) {
    this.client = client;
    this.countryCode = countryCode;
    this.url = url;
    this.channelId = channelId;
    this.roleId = roleId;
  }

  async post() {
    const cachedItems = this.client[`taylorStore${this.countryCode}`];
    const channel = this.client.channels.cache.get(this.channelId);
    const role = roleMention(this.roleId);

    await fetch(`${this.url}/products.json?limit=250`)
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
            content: `${product.title} - **Potential New/Restocked Item** ${role}`,
            embeds: [
              new EmbedBuilder()
                .setAuthor({ name: `Official ${this.countryCode} Store` })
                .setTitle(product.title)
                .setURL(`${this.url}/products/${product.handle}`)
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
                    .setURL(`${this.url}/products/${product.handle}`),
                ),
            ],
          }));
        }

        this.client[`taylorStore${this.countryCode}`].clear();
        response.products
          .filter(product => product.variants[0].available)
          .map(product => this.client[`taylorStore${this.countryCode}`].set(product.id, product.title));
      });
  }

  async cache() {
    await fetch(`${this.url}/products.json?limit=250`)
      .then((response) => response.json())
      .then((response) => {
        response.products
          .filter(product => product.variants[0].available)
          .map(product => this.client[`taylorStore${this.countryCode}`].set(product.id, product.title));
        logger.log('info', `${this.countryCode} Store Items Cached`);
      });
  }
}

module.exports = { TaylorStoreAutoPoster };
