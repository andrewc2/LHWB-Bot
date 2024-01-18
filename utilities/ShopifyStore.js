const fetch = require('node-fetch');
const {
  ActionRowBuilder,
  bold,
  ButtonBuilder,
  ButtonStyle,
  Collection,
  Colors,
  EmbedBuilder,
  hyperlink,
  roleMention,
  strikethrough,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require('discord.js');
const { diff } = require('deep-object-diff');
const { logger } = require('./winstonLogging');

module.exports = class ShopifyStore {
  /**
   * Creates a new instance of a Shopify Store.
   * @param client Discord.js client
   * @param storeName The name of the Shopify store
   * @param storeNameShort A short version of the name of the Shopify Store, should be in camelCase.
   * @param storeUrl The base URL of the Shopify store
   * @param channelId The channel ID of the Discord channel to send the update to
   * @param roleId The ID of the role to ping when an update is sent to a Discord channel
   * @param currencySymbol The currency prefix of the Shopify store (e.g £)
   * @param enableCart Whether cart/basket functionality should be enabled for this Shopify store
   * @param enableBuyNow Whether "buy now" functionality should be enabled for this Shopify store
   * @param fastFetch Whether "fast fetch" functionality should be enabled for this Shopify store. Fast fetch will check the store for new products every 10 seconds
   */
  constructor(
    client,
    storeName,
    storeNameShort,
    storeUrl,
    channelId,
    roleId,
    currencySymbol,
    enableCart,
    enableBuyNow,
    fastFetch,
  ) {
    this.client = client;
    this.storeName = storeName;
    this.storeNameShort = storeNameShort;
    this.ready = false;
    this.storeUrl = storeUrl;
    this.collection = new Collection();
    this.channelId = channelId;
    this.roleId = roleId;
    this.currencySymbol = currencySymbol;
    this.enableCart = enableCart;
    this.enableBuyNow = enableBuyNow;
    this.fastFetch = fastFetch;
    this.productFetchLimit = 250;
  }

  /**
   * Initialises the product cache for each store when the ShopifyStore
   * is first initialised.
   */
  async cache() {
    await this.fetchProductData()
      .then((products) => {
        this.updateCollection(this.collection, products);
        logger.log('info', `${this.storeName} Has Been Cached (${this.collection.size} Products)`);
      }).then(() => (this.ready = true)).catch(() => logger.error('error', `Error caching ${this.storeName}`));
  }

  /**
   * Periodically fetches new data from the ShopifyStore.
   * If new data is found when compared to the cache,
   * a post will be sent to the specified social network.
   */
  async post() {
    if (!this.isReady()) return;

    const channel = this.client.channels.cache.get(this.channelId);
    if (!channel) {
      throw new Error('Channel undefined');
    }

    this.disableStore();

    try {
      const productCollection = new Collection();
      const products = await this.fetchProductData();
      this.updateCollection(productCollection, products);

      const newProducts = this.filterProducts(productCollection);
      if (newProducts.size > 0) {
        newProducts.forEach((product) => {
          const whatsNew = this.whatsNew(product);
          if (typeof whatsNew === 'boolean') return;
          this.postToDiscord(product, channel, whatsNew);
        });
      }

      this.collection.clear();
      this.updateCollection(this.collection, products);
      this.enableStore();
    }
    catch (error) {
      this.disableStore();
      logger.log('error', this.storeName, error);
    }
  }

  /**
   * Returns a Collection of all the products from the Shopify store,
   * filtered by whether the product is available or not.
   * @private
   */
  async fetchProductData() {
    return await fetch(
      `${this.storeUrl}/products.json?limit=${this.productFetchLimit}`,
    )
      .then((response) => response.json())
      .then((response) => response)
      .then((response) =>
        response.products.filter((product) =>
          product.variants.some((p) => p.available),
        ),
      );
  }

  /**
   * Filters the products in the cache and new collection to remove.
   * any products that have not changed
   * @param products The new products data
   * @private
   */
  filterProducts(products) {
    return products.filter((product) => {
      const existingProduct = this.collection.get(product.id);
      return (
        !existingProduct ||
                JSON.stringify(existingProduct.variants) !==
                JSON.stringify(product.variants)
      );
    });
  }

  /**
   * Maps the product data to CollectionProduct and updates the collection.
   * @param collection The collection to update
   * @param products The new product data
   * @private
   */
  updateCollection(
    collection,
    products,
  ) {
    products.forEach((product) =>
      collection.set(product.id, {
        id: product.id,
        primaryVariantId: product.variants[0].id,
        vendor: product.vendor,
        title: product.title,
        handle: product.handle,
        image: product.images?.[0]?.src,
        publishedAt: product.published_at,
        primaryPrice: product.variants[0].price,
        variants: product.variants.map((variant) => ({
          id: variant.id,
          available: variant.available,
          title: variant.title,
          price: variant.price,
        })),
      }),
    );
  }

  /**
   * Handles posting new product data to a Discord channel.
   * @param product The new product data
   * @param channel The Discord channel to send the message to
   * @param whatsNew The description of what's changed
   * @private
   */
  postToDiscord(
    product,
    channel,
    whatsNew,
  ) {
    const messageContent = `__${this.storeName}__: ${product.title} - **${whatsNew}** ${roleMention(this.roleId)}`;
    const embed = this.createProductEmbed(product);
    const components = this.createComponents(product);

    void channel.send({
      content: messageContent,
      embeds: [embed],
      components: components,
    });
  }

  /**
   * Creates an embed that will be sent to Discord.
   * @param product The new product data
   * @private
   */
  createProductEmbed(product) {
    return new EmbedBuilder()
      .setAuthor({ name: this.storeName, url: this.storeUrl })
      .setTitle(product.title)
      .setURL(`${this.storeUrl}/products/${product.handle}`)
      .setFields([
        {
          name: 'Price',
          value: `${this.currencySymbol}${product.primaryPrice}`,
        },
        {
          name: this.enableBuyNow ? 'Buy Now' : 'Variants',
          value: product.variants
            .map((variant) =>
              variant.available
                ? this.enableBuyNow
                  ? hyperlink(
                    variant.title,
                    `${this.storeUrl}/cart/${variant.id}:1`,
                  )
                  : bold(variant.title)
                : strikethrough(variant.title),
            )
            .join(' | '),
        },
      ])
      .setThumbnail(product.image)
      .setTimestamp(new Date(product.publishedAt))
      .setColor(Colors.Gold);
  }

  /**
   * Creates components that will be sent to Discord.
   * These components will be used for the cart functionality.
   * @param product
   * @private
   */
  createComponents(product) {
    if (!this.enableCart) {
      return [];
    }

    const components = [];

    if (this.enableCart) {
      const cartRow = new ActionRowBuilder().addComponents(
        ...((product.variants.length === 1 && [
          new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setLabel('Add to Cart')
            .setCustomId(
              JSON.stringify({
                type: 'store',
                id: product.primaryVariantId,
                action: 'add',
                store: this.storeNameShort,
              }),
            ),
        ]) ||
                    []),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Primary)
          .setLabel('Get Cart')
          .setCustomId(
            JSON.stringify({
              type: 'store',
              url: this.storeUrl,
              action: 'get',
              store: this.storeNameShort,
            }),
          ),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Danger)
          .setLabel('Clear Cart')
          .setCustomId(
            JSON.stringify({
              type: 'store',
              action: 'clear',
              store: this.storeNameShort,
            }),
          ),
      );

      components.push(cartRow);
    }

    if (product.variants.length > 1) {
      const selectMenuRow =
                new ActionRowBuilder().addComponents(
                  new StringSelectMenuBuilder()
                    .setPlaceholder('Add to Cart')
                    .setCustomId(
                      JSON.stringify({
                        action: 'add',
                        store: this.storeNameShort,
                      }),
                    )
                    .setMaxValues(
                      product.variants.filter(
                        (variant) => variant.available,
                      ).length,
                    )
                    .addOptions(
                      product.variants
                        .filter((variant) => variant.available)
                        .map((variant) =>
                          new StringSelectMenuOptionBuilder()
                            .setLabel(variant.title)
                            .setValue(variant.id.toString()),
                        ),
                    ),
                );

      components.push(selectMenuRow);
    }

    return components;
  }

  /**
   * Compares the old product data with the new product data to figure
   * out what has changed.
   * @param product The new product data
   * @private
   */
  whatsNew(product) {
    const originalProduct = this.collection.get(product.id);
    if (!originalProduct) {
      return 'New/Restocked Item';
    }

    const inStock = [];
    const outOfStock = [];

    const difference = JSON.parse(
      JSON.stringify(diff(originalProduct, product)),
    );

    for (const [key, value] of Object.entries(difference.variants)) {
      const variant = product.variants[Number(key)];
      if (value?.available) {
        inStock.push(variant.title);
      }
      else if (!value?.available) {
        outOfStock.push(variant.title);
      }
    }

    const variantsRestocked = inStock.length > 0;
    return variantsRestocked
      ? `Restocked Variants (${inStock.join(', ')})`
      : false;
  }

  /**
   * Used to filter out ShopifyStores that do not have fast fetch enabled.
   */
  isFastFetchEnabled() {
    return this.fastFetch;
  }

  /**
   * Checks to see if the ShopifyStore is ready to searched for new products.
   */
  isReady() {
    return this.ready;
  }

  /**
   * Enables a ShopifyStore so that it is ready to be searched for new
   * products.
   */
  enableStore() {
    this.ready = true;
  }

  /**
   * Disables a ShopifyStore so that it won't be searched anymore.
   */
  disableStore() {
    this.ready = false;
  }
};
