import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import {
  FrameworkClient,
  CommandHandler,
  ListenerHandler,
  InhibitorHandler,
} from '@lhwb/framework';
import { LoggerTool, MySQLDriver, RedisDriver } from '@lhwb/shared';
import { GatewayIntentBits, Partials } from 'discord.js';

export default class UtilityBotClient extends FrameworkClient {
  commandHandler = new CommandHandler(this, {
    directory: join(dirname(fileURLToPath(import.meta.url)), '..', 'commands'),
    extensions: ['.js'],
    blockBots: true,
    blockClient: true,
    automateCategories: true,
  });

  listenerHandler = new ListenerHandler(this, {
    extensions: ['.js'],
    directory: join(dirname(fileURLToPath(import.meta.url)), '..', 'listeners'),
  });

  inhibitorHandler = new InhibitorHandler(this, {
    extensions: ['.js'],
    directory: join(
      dirname(fileURLToPath(import.meta.url)),
      '..',
      'inhibitors',
    ),
  });

  constructor(config) {
    super({
      ownerId: config.discord.owner_id,
      allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildExpressions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
      ],
      partials: [Partials.Channel],
    });

    this.config = config;
    this.logger = new LoggerTool('@lhwb/utility-bot');
    this.database = new MySQLDriver(this.logger);
    this.cache = new RedisDriver(this.logger, this.database);
    this.apiCommands = undefined;
  }

  async _init() {
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
    });

    await this.database.connect();
    await this.cache.connect();

    await this.commandHandler.loadAll();
    await this.inhibitorHandler.loadAll();
    await this.listenerHandler.loadAll();
  }

  async start() {
    await this._init();
    return this.login(this.config.discord.token);
  }
}
