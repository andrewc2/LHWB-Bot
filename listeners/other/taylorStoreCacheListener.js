const { Listener } = require('discord-akairo');
const { Events } = require('discord.js');
const fetch = require('node-fetch');
const { logger } = require('../../utilities/winstonLogging');

module.exports = class TaylorStoreCacheListener extends Listener {
  constructor() {
    super('taylorStoreCacheListener', {
      event: Events.ClientReady,
      category: 'other',
      emitter: 'client',
    });
  }

  async exec() {
    fetch('https://store.taylorswift.com/products.json')
      .then((response) => response.json())
      .then((response) => {
        response.products
          .filter(product => product.variants[0].available)
          .map(product => this.client.taylorStore.set(product.id, product.title));
        logger.log('info', 'Taylor Store Items Cached');
      });
  }
};
