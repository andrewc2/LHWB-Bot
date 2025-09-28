import { diff } from 'deep-object-diff';
import {
  ActionRowBuilder,
  APIMessage,
  bold,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Collection,
  Colors,
  EmbedBuilder,
  hyperlink,
  inlineCode,
  roleMention,
  strikethrough,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  TextChannel,
  underline,
  WebhookClient,
} from 'discord.js';

import {
  CollectionProduct,
  CollectionVariants,
} from './interface/collectionProduct.js';
import { Product, ShopifyResponse } from './interface/shopifyProduct.js';
import { DiscordInformation } from './interface/storeConfigInterface.js';
import { logger } from './utilities.js';

export default class ShopifyStore {
  private client: Client;
  private ready: boolean;
  private readonly storeName: string;
  private readonly storeNameShort: string;
  private readonly storeUrl: string;
  private readonly collection: Collection<number, CollectionProduct>;
  private readonly discordInformation: DiscordInformation[];
  private readonly currencySymbol: string;
  private readonly enableCart: boolean;
  private readonly enableBuyNow: boolean;
  private readonly interval: number;
  private readonly massPingLimit: number | undefined;
  private readonly productFetchLimit: number;
  private readonly webhookClient: WebhookClient | undefined;

  /**
   * Creates a new instance of a Shopify Store.
   * @param client Discord.js client
   * @param storeName The name of the Shopify store
   * @param storeNameShort A short version of the name of the Shopify Store, should be in camelCase
   * @param storeUrl The base URL of the Shopify store
   * @param discordInformation An array of Discord channel and role IDs
   * @param currencySymbol The currency prefix of the Shopify store (e.g £)
   * @param enableCart Whether cart/basket functionality should be enabled for this Shopify store
   * @param enableBuyNow Whether "buy now" functionality should be enabled for this Shopify store
   * @param interval How often to search the Shopify store for new products (in milliseconds)
   * @param massPingLimit Prevent mass pinging whenever a given number of items are refreshed in a store
   * @param webhookUrl URL to send webhook error updates to
   */
  constructor(
    client: Client,
    storeName: string,
    storeNameShort: string,
    storeUrl: string,
    discordInformation: DiscordInformation[],
    currencySymbol: string,
    enableCart: boolean,
    enableBuyNow: boolean,
    interval: number,
    massPingLimit?: number,
    webhookUrl?: string,
  ) {
    this.client = client;
    this.storeName = storeName;
    this.storeNameShort = storeNameShort;
    this.ready = false;
    this.storeUrl = storeUrl;
    this.collection = new Collection<number, CollectionProduct>();
    this.discordInformation = discordInformation;
    this.currencySymbol = currencySymbol;
    this.enableCart = enableCart;
    this.enableBuyNow = enableBuyNow;
    this.interval = interval;
    this.massPingLimit = massPingLimit;
    this.productFetchLimit = 250;
    this.webhookClient = webhookUrl
      ? new WebhookClient({ url: webhookUrl })
      : undefined;
  }

  /**
   * Initialises the product cache for each store when the ShopifyStore
   * is first initialised and checks to see if the Discord channels exists.
   */
  public async cache(): Promise<void> {
    const channelsExist = this.discordInformation.every((guild) =>
      this.client.channels.cache.has(guild['channel_id']),
    );
    if (!channelsExist) {
      logger.error(
        `Channel undefined for ${this.storeName}. Please check the channel-id in config.json.`,
      );
      throw new Error();
    }

    try {
      const products = await this.fetchProductData();
      this.updateCollection(this.collection, products);
      logger.info(`Cached ${products.length} products for ${this.storeName}`);
      this.enableStore();
      setInterval(async () => await this.post(), this.interval);
    } catch (error) {
      this.disableStore();
      logger.error((error as Error).toString());
    }
  }

  /**
   * Periodically fetches new data from the ShopifyStore.
   * If new data is found when compared to the cache,
   * a post will be sent to the specified social network.
   */
  public async post(): Promise<void> {
    if (!this.isReady()) return;
    this.disableStore();
    try {
      const productCollection = new Collection<number, CollectionProduct>();
      const products = await this.fetchProductData();
      this.updateCollection(productCollection, products);

      const newProducts = this.filterProducts(productCollection);

      if (newProducts.size > 0) {
        const shouldMassPost =
          this.massPingLimit && newProducts.size >= this.massPingLimit;

        if (shouldMassPost) {
          this.massPostToDiscord(newProducts);
        } else {
          newProducts.forEach((product) => {
            const whatsNew = this.whatsNew(product);
            if (typeof whatsNew !== 'boolean') {
              this.postToDiscord(product, whatsNew);
            }
          });
        }
      }

      this.collection.clear();
      this.updateCollection(this.collection, products);
      this.enableStore();
    } catch (error) {
      this.disableStore();
      await this.errorAlert((error as Error).toString());
      logger.error(
        `${this.storeName} has been disabled due to the following error: ${error}`,
      );
    }
  }

  /**
   * Returns a Collection of all the products from the Shopify store,
   * filtered by whether the product is available or not
   * @private
   */
  private async fetchProductData(): Promise<Product[]> {
    const response = await fetch(
      `${this.storeUrl}/products.json?limit=${this.productFetchLimit}`,
    );
    const data = (await response.json()) as ShopifyResponse;
    return data.products.filter((product) =>
      product.variants.some((p) => p.available),
    );
  }

  /**
   * Filters the products in the cache and new collection to remove
   * any products that have not changed
   * @param products The new products data
   * @private
   */
  private filterProducts(
    products: Collection<number, CollectionProduct>,
  ): Collection<number, CollectionProduct> {
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
   * Maps the product data to CollectionProduct and updates the collection
   * @param collection The collection to update
   * @param products The new product data
   * @private
   */
  private updateCollection(
    collection: Collection<number, CollectionProduct>,
    products: Product[],
  ): void {
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
   * @param whatsNew The description of what's changed
   * @private
   */
  private postToDiscord(product: CollectionProduct, whatsNew: string): void {
    const messageContent = `${underline(this.storeName)}: ${product.title} - ${bold(whatsNew)}`;
    const embed = this.createProductEmbed(product);
    const components = this.createComponents(product);

    this.discordInformation.forEach((guild) => {
      const channel = this.client.channels.cache.get(
        guild['channel_id'],
      ) as TextChannel;
      void channel.send({
        content: `${messageContent} ${roleMention(guild['role_id'])}`,
        embeds: [embed],
        components: components,
      });
    });
  }

  /**
   * Handles grouping multiple refreshed products into one ping to prevent mass pinging from occurring.
   * @param newProducts The new products data as a Collection
   * @private
   */
  private massPostToDiscord(
    newProducts: Collection<number, CollectionProduct>,
  ): void {
    const embeds = Array.from(newProducts.values(), (product) =>
      this.createProductEmbed(product),
    ).reduce((all, one, i) => {
      const chunkIndex = Math.floor(i / 5);
      all[chunkIndex] = (all[chunkIndex] || []).concat(one);
      return all;
    }, [] as EmbedBuilder[][]);

    const messageContent = `${underline(this.storeName)}: ${bold(`${newProducts.size} Products Added/Restocked!`)} View channel for more information.`;

    this.discordInformation.forEach((guild) => {
      const channel = this.client.channels.cache.get(
        guild['channel_id'],
      ) as TextChannel;
      embeds.forEach((embed, i) => {
        void channel.send({
          ...(i === 0 && {
            content: `${messageContent} ${roleMention(guild['role_id'])}`,
          }),
          embeds: embed,
        });
      });
    });
  }

  /**
   * Creates an embed that will be sent to Discord.
   * @param product The new product data
   * @private
   */
  private createProductEmbed(product: CollectionProduct): EmbedBuilder {
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
  private createComponents(
    product: CollectionProduct,
  ): (
    | ActionRowBuilder<ButtonBuilder>
    | ActionRowBuilder<StringSelectMenuBuilder>
  )[] {
    if (!this.enableCart) {
      return [];
    }

    const components = [];

    if (this.enableCart) {
      const cartRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
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
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
          new StringSelectMenuBuilder()
            .setPlaceholder('Add to Cart')
            .setCustomId(
              JSON.stringify({
                type: 'store',
                action: 'add',
                store: this.storeNameShort,
              }),
            )
            .setMaxValues(
              product.variants.filter((variant) => variant.available).length,
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
  private whatsNew(product: CollectionProduct): string | boolean {
    const originalProduct = this.collection.get(product.id);
    if (!originalProduct) {
      return 'New/Restocked Item';
    }

    const inStock = [];
    const outOfStock = [];

    const difference = JSON.parse(
      JSON.stringify(diff(originalProduct, product)),
    );

    for (const [key, value] of Object.entries(difference.variants) as [
      string,
      CollectionVariants,
    ][]) {
      const variant = product.variants[Number(key)];
      if (value?.available) {
        inStock.push(variant.title);
      } else if (!value?.available) {
        outOfStock.push(variant.title);
      }
    }

    const variantsRestocked = inStock.length > 0;
    return variantsRestocked
      ? `Restocked Variants (${inStock.join(', ')})`
      : false;
  }

  /**
   * Sends a message via webhook whenever a store error occurs.
   * @param error The error message
   * @returns {APIMessage>}
   * @private
   */
  private async errorAlert(error: string): Promise<APIMessage | undefined> {
    if (!this.webhookClient) return;
    const embed = new EmbedBuilder()
      .setTitle(`Alert: Error for ${this.storeName}`)
      .setDescription(`${inlineCode(error)}`)
      .setTimestamp()
      .setColor(Colors.Red);

    return this.webhookClient.send({ embeds: [embed] });
  }

  /**
   * Checks to see if the ShopifyStore is ready to searched for new products.
   */
  public isReady(): boolean {
    return this.ready;
  }

  /**
   * Enables a ShopifyStore so that it is ready to be searched for new
   * products.
   */
  public enableStore(): void {
    this.ready = true;
  }

  /**
   * Disables a ShopifyStore so that it won't be searched anymore.
   */
  public disableStore(): void {
    this.ready = false;
  }
}
