const { Listener } = require('discord-akairo');
const { Events } = require('discord.js');
const { isJSON } = require('../../utilities/utilities');

module.exports = class CartInteractionButtonListener extends Listener {
  constructor() {
    super('cartInteractionButtonListener', {
      event: Events.InteractionCreate,
      category: 'other',
      emitter: 'client',
    });
  }

  async exec(interaction) {
    if (!interaction.isButton() || !interaction.guild) return;
    const customId = interaction.customId;
    if (!isJSON(customId)) return;
    const productDetails = JSON.parse(customId);
    if (productDetails.type !== 'store') return;

    const cartCache = this.client.cart;
    const userCart = cartCache.get(interaction.user.id);
    if (!userCart) cartCache.set(interaction.user.id, null);
    const currentStoreCart = userCart?.[productDetails.store] ?? [];

    if (productDetails.action === 'add') {
      cartCache.set(interaction.user.id, {
        ...userCart,
        [productDetails.store]: [...currentStoreCart, productDetails.id],
      });
      interaction.reply({
        content: 'Item added to your cart!',
        ephemeral: true,
      });
    }
    else if (productDetails.action === 'get') {
      if (currentStoreCart.length === 0) {
        interaction.reply({
          content: 'You have nothing in your cart for this store!',
          ephemeral: true,
        });
        return;
      }
      const url = currentStoreCart
        .map((variantId) => `${variantId}:1`)
        .join(',');
      interaction.reply({
        content: `[Press here to go to your cart!](<${productDetails.url}/cart/${url}>)`,
        ephemeral: true,
      });
    }
    else if (productDetails.action === 'clear') {
      delete userCart?.[productDetails.store];
      cartCache.set(interaction.user.id, { ...userCart });
      interaction.reply({
        content: 'Your cart has been cleared.',
        ephemeral: true,
      });
    }
  }
};
