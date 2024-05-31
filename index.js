import { GatewayIntentBits, Partials, Collection } from 'discord.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import Client from './structure/Client.js';
import CommandHandler from './structure/commands/CommandHandler.js';
import ListenerHandler from './structure/listeners/ListenerHandler.js';
import InhibitorHandler from './structure/inhibitors/InhibitorHandler.js';
import ShopifyStore from './utilities/ShopifyStore.js';
import VoiceServer from './utilities/VoiceServer.js';
import Utilities from './utilities/Utilities.js';
const config = await Utilities.loadJSON('../config.json');
const voiceServers = await Utilities.loadJSON('../voice-servers.json');

class LosingHimWasBlueClient extends Client {
  constructor() {
    super({
      ownerId: config.discord.owner,
      allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.Channel],
    });

    this.commandHandler = new CommandHandler(this, {
      directory: join(dirname(fileURLToPath(import.meta.url)), '.', 'commands'),
      blockBots: true,
      blockClient: true,
      automateCategories: true,
      ignorePermissions: [config.discord.owner, config.discord.ignore_perms.join(', ')],
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: join(dirname(fileURLToPath(import.meta.url)), '.', 'listeners'),
    });

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: join(dirname(fileURLToPath(import.meta.url)), '.', 'inhibitors'),
    });

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
    });

    this.voiceServers = voiceServers.map((voiceServer) => new VoiceServer(
      this,
      voiceServer['filepath'],
      voiceServer['primary_artist'],
      voiceServer['channel_id'],
      voiceServer['stage_channel_id'],
      voiceServer['guild_id'],
    ));

    this.botBanned = new Collection();
    this.apiCommands = new Collection() | undefined;

    this.cart = new Collection();
    this.stores = config['store_details'].map((store) => new ShopifyStore(
      this,
      store['store_name'],
      store['store_name_short'],
      store['store_url'],
      store['channel_id'],
      store['role_id'],
      store['currency_symbol'],
      store['webhook_url'],
      store['enable_cart'],
      store['enable_buy_now'],
      store['interval'],
    ));

    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    void this.inhibitorHandler.loadAll();
    void this.listenerHandler.loadAll();
    void this.commandHandler.loadAll();
  }
}

const client = new LosingHimWasBlueClient();
void client.login(config.discord.discord_token);
