import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import {
  FrameworkClient,
  CommandHandler,
  ListenerHandler,
  InhibitorHandler,
} from '@lhwb/framework';
import {
  MySQLDriver,
  LoggerTool,
  Utilities,
  ConfigInterface,
  RedisDriver,
} from '@lhwb/shared';
import { GatewayIntentBits, Partials } from 'discord.js';

import MusicServer, {
  MusicServerInterface,
} from '../modules/music/MusicServer.js';

const musicServers = await Utilities.loadJSON('music-servers.json');

export default class MusicBotClient extends FrameworkClient {
  public override commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(dirname(fileURLToPath(import.meta.url)), '..', 'commands'),
    extensions: ['.js'],
    blockBots: true,
    blockClient: true,
    automateCategories: true,
  });

  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    extensions: ['.js'],
    directory: join(dirname(fileURLToPath(import.meta.url)), '..', 'listeners'),
  });

  public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
    extensions: ['.js'],
    directory: join(
      dirname(fileURLToPath(import.meta.url)),
      '..',
      'inhibitors',
    ),
  });

  public config: ConfigInterface;

  public constructor(config: ConfigInterface) {
    super({
      ownerId: config.discord.owner_id,
      allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildExpressions,
        GatewayIntentBits.GuildVoiceStates,
      ],
      partials: [Partials.User, Partials.Channel, Partials.GuildMember],
    });

    this.config = config;
    this.logger = new LoggerTool('@lhwb/music-bot');
    this.database = new MySQLDriver(this.logger);
    this.cache = new RedisDriver(this.logger, this.database);
    this.apiCommands = undefined;
    this.musicServers = musicServers.map(
      (musicServer: MusicServerInterface) =>
        new MusicServer(
          this,
          musicServer['root_filepath'],
          musicServer['primary_artist'],
          musicServer['voice_channel_id'],
          musicServer['stage_channel_id'],
          musicServer['guild_id'],
        ),
    );
  }

  private async _init(): Promise<void> {
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

  public async start(): Promise<string> {
    await this._init();
    return this.login(this.config.discord.token);
  }
}
