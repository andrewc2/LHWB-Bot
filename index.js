const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler, SQLiteProvider } = require("discord-akairo");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const config = require("./config.json");

class Client extends AkairoClient {
    constructor() {
        super({
            ownerID: config.discord.ownerID,
            allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
            intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
            partials: ['CHANNEL']
        });

        this.settings = new SQLiteProvider(sqlite.open({ filename: path.join(__dirname, "settings.sqlite3"), driver: sqlite3.Database }), 'bot', {
            idColumn: 'guild_id',
            dataColumn: 'settings'
        });

        this.commandHandler = new CommandHandler(this, {
            directory: path.join(__dirname, "commands"),
            prefix: message => {
                if (message.guild) return this.settings.get(message.guild.id, 'prefix', config.discord.prefix);
                else if (!message.guild) return ''
                return config.discord.prefix;
            },
            ignorePermissions: [config.discord.ownerID, config.discord.fs, config.discord.username],
            allowMention: true,
            commandUtil: true,
            commandUtilLifetime: 10000,
            handleEdits: true,
            blockBots: true,
            blockClient: true,
            automateCategories: true
        })

        this.listenerHandler = new ListenerHandler(this, {
            directory: path.join(__dirname, "listeners")
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: path.join(__dirname, "inhibitors")
        });

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler
        });

        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
    }
    async login(token) {
        await this.settings.init()
        return super.login(token);
    }
}

const client = new Client()
client.login(config.discord.token)