const { AkairoClient, MessageCommandHandler, SlashCommandHandler, ListenerHandler, InhibitorHandler, Flag } = require('discord-akairo');
const { GatewayIntentBits, Partials } = require('discord.js');
const path = require('path');
const config = require('./config.json');
const { FETCH_ALL_QUEUEABLE_SONGS } = require('./models/musicQueries');
const { editDistance } = require('./utilities/fuzzySearch');
const { db } = require('./models/db');

class Client extends AkairoClient {
  constructor() {
    super({
      ownerID: config.discord.owner,
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

    this.messageCommandHandler = new MessageCommandHandler(this, {
      directory: path.join(__dirname, 'messageCommands'),
      prefix: config.discord.prefix,
      ignorePermissions: [config.discord.owner, config.discord.ignore_perms.join(', ')],
      allowMention: true,
      commandUtil: true,
      commandUtilLifetime: 10000,
      handleEdits: true,
      blockBots: true,
      blockClient: true,
      automateCategories: true,
    });

    this.messageCommandHandler.resolver.addType('song', async (message, phrase) => {
      if (!phrase) return Flag.fail(phrase);
      const maxEditDist = 5;
      let res, minEditDist = maxEditDist;
      const [result] = await db.promise().query(FETCH_ALL_QUEUEABLE_SONGS);
      for (let i = 0; i < result.length; i++) {
        editDistance(phrase.toLowerCase(), result[i]['song_name'].toLowerCase(), function(tempDist) {
          if (tempDist < minEditDist && tempDist <= maxEditDist) {
            minEditDist = tempDist;
            res = result[i];
          }
        });
      }
      if (res === undefined) return null;
      return res;
    });

    this.slashCommandHandler = new SlashCommandHandler(this, {
      directory: path.join(__dirname, 'slashCommands'),
      ignorePermissions: [config.discord.owner, config.discord.ignore_perms.join(', ')],
      automateCategories: true,
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: path.join(__dirname, 'listeners'),
    });

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: path.join(__dirname, 'inhibitors'),
    });

    this.listenerHandler.setEmitters({
      messageCommandHandler: this.messageCommandHandler,
      slashCommandHandler: this.slashCommandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
    });

    this.messageCommandHandler.useListenerHandler(this.listenerHandler);
    this.messageCommandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.slashCommandHandler.useListenerHandler(this.listenerHandler);
    this.slashCommandHandler.useInhibitorHandler(this.inhibitorHandler);
    void this.inhibitorHandler.loadAll();
    void this.listenerHandler.loadAll();
    void this.messageCommandHandler.loadAll();
    void this.slashCommandHandler.loadAll();
  }
}

const client = new Client();
void client.login(config.discord.discord_token);
