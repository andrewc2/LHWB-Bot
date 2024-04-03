import Listener from '../../structure/listeners/Listener.js';
import { Events } from 'discord.js';
import Utilities from '../../utilities/Utilities.js';

export default class CartInteractionSelectMenu extends Listener {
  constructor() {
    super('cartInteractionSelectMenu', {
      event: Events.InteractionCreate,
      category: 'store',
      emitter: 'client',
    });
  }

  async exec(interaction) {
    if (!interaction.isStringSelectMenu()) return;
    const customId = interaction.customId;
    if (!Utilities.isJSON(customId)) return;
    const details = JSON.parse(customId);

    if (details.action !== 'add') return;

    const cartCache = this.client.cart;
    const userCart = cartCache.get(interaction.user.id);
    if (!userCart) cartCache.set(interaction.user.id, null);
    const currentStoreCart = userCart?.[details.store] ?? [];

    cartCache.set(interaction.user.id, {
      ...userCart,
      [details.store]: [...currentStoreCart, ...interaction.values],
    });

    const multipleItems = interaction.values.length > 1;
    const content = `${interaction.values.length} ${
      multipleItems ? 'items have' : 'item has'
    } been added to your cart!`;

    interaction.reply({ content: content, ephemeral: true });
  }

}
