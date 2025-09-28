import { ConfigInterface, Utilities } from '@lhwb/shared';
import { parseCronExpression } from 'cron-schedule';
import { TimerBasedCronScheduler } from 'cron-schedule/schedulers/timer-based.js';
import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  MessageFlags,
  Snowflake,
} from 'discord.js';

import { StoreConfigInterface } from './interface/storeConfigInterface';
import ShopifyStore from './ShopifyStore.js';
import { logger } from './utilities.js';

const storeConfig = (await Utilities.loadJSON(
  'merch-stores.json',
)) as StoreConfigInterface[];

const config = (await Utilities.loadJSON('config.json')) as ConfigInterface;

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const stores = storeConfig.map(
  (details) =>
    new ShopifyStore(
      client,
      details['store_name'],
      details['store_name_short'],
      details['store_url'],
      details['discord_information'],
      details['currency_symbol'],
      details['enable_cart'],
      details['enable_buy_now'],
      details['interval'],
      details['mass_ping_limit'],
      details['webhook_url'],
    ),
);

const cartCache = new Collection<
  Snowflake,
  { [storeName: string]: number[] } | null
>();

const enableStores = (stores: ShopifyStore[]) => {
  const disabledStores = stores.filter((store) => !store.isReady());
  disabledStores.filter((store) =>
    setTimeout(() => store.enableStore(), 10000),
  );
};

client.once(Events.ClientReady, () => {
  logger.info(`@lhwb/merch-bot has logged in`);
  stores.forEach((store) => store.cache());
});

client.on(Events.ClientReady, async () => {
  TimerBasedCronScheduler.setInterval(parseCronExpression('*/30 * * * *'), () =>
    cartCache.clear(),
  );
  TimerBasedCronScheduler.setInterval(parseCronExpression('*/2 * * * *'), () =>
    enableStores(stores),
  );
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) return;
  const customId = interaction.customId;
  if (!Utilities.isJSON(customId)) return;
  const productDetails = JSON.parse(customId);
  if (productDetails.type !== 'store') return;

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
      flags: [MessageFlags.Ephemeral],
    });
  } else if (productDetails.action === 'get') {
    if (currentStoreCart.length === 0) {
      interaction.reply({
        content: 'You have nothing in your cart for this store!',
        flags: [MessageFlags.Ephemeral],
      });
      return;
    }
    const url = currentStoreCart.map((variantId) => `${variantId}:1`).join(',');
    interaction.reply({
      content: `[Press here to go to your cart!](<${productDetails.url}/cart/${url}>)`,
      flags: [MessageFlags.Ephemeral],
    });
  } else if (productDetails.action === 'clear') {
    delete userCart?.[productDetails.store];
    cartCache.set(interaction.user.id, { ...userCart });
    interaction.reply({
      content: `Your cart has been cleared.`,
      flags: [MessageFlags.Ephemeral],
    });
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  const customId = interaction.customId;
  if (!Utilities.isJSON(customId)) return;
  const productDetails = JSON.parse(customId);
  if (productDetails.type !== 'store') return;

  if (productDetails.action !== 'add') return;

  const userCart = cartCache.get(interaction.user.id);
  if (!userCart) cartCache.set(interaction.user.id, null);
  const currentStoreCart = userCart?.[productDetails.store] ?? [];

  cartCache.set(interaction.user.id, {
    ...userCart,
    [productDetails.store]: [...currentStoreCart, ...interaction.values],
  });

  const multipleItems = interaction.values.length > 1;
  const content = `${interaction.values.length} ${
    multipleItems ? 'items have' : 'item has'
  } been added to your cart!`;

  interaction.reply({ content: content, flags: [MessageFlags.Ephemeral] });
});

await client.login(config.discord.token);
