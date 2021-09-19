const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler, Flag, SQLiteProvider } = require("discord-akairo");
const { Intents } = require("discord.js");
const path = require("path");
const config = require("./config.json");
const { db } = require("./models/db");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const { FETCH_ALL_QUEUEABLE_SONGS } = require("./models/music-queries");
const { editDistance } = require("./utilities/fuzzy-search");

class Client extends AkairoClient {
	constructor() {
		super({
			ownerID: config.discord.owner,
			allowedMentions: { parse: ["users", "roles"], repliedUser: true },
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.DIRECT_MESSAGES,
			],
			partials: ["CHANNEL"],
		});

		this.settings = new SQLiteProvider(sqlite.open({ filename: path.join(__dirname, "settings.sqlite3"), driver: sqlite3.Database }), "bot", {
			idColumn: "guild_id",
			dataColumn: "settings",
		});

		this.commandHandler = new CommandHandler(this, {
			directory: path.join(__dirname, "commands"),
			prefix: message => {
				if (message.guild) return this.settings.get(message.guild.id, "prefix", config.discord.prefix);
				else if (!message.guild) return "";
				return config.discord.prefix;
			},
			ignorePermissions: [config.discord.owner, config.discord.ignore_perms.join(", ")],
			allowMention: true,
			commandUtil: true,
			commandUtilLifetime: 10000,
			handleEdits: true,
			blockBots: true,
			blockClient: true,
			automateCategories: true,
		});

		this.commandHandler.resolver.addType("song", async (message, phrase) => {
			if (!phrase) return Flag.fail(phrase);
			const maxEditDist = 5;
			let res, minEditDist = maxEditDist;
			const [result] = await db.promise().query(FETCH_ALL_QUEUEABLE_SONGS);
			for (let i = 0; i < result.length; i++) {
				editDistance(phrase.toLowerCase(), result[i]["song_name"].toLowerCase(), function(tempDist) {
					if (tempDist < minEditDist && tempDist <= maxEditDist) {
						minEditDist = tempDist;
						res = result[i];
					}
				});
			}
			if (res === undefined) return null;
			return res;
		});

		this.listenerHandler = new ListenerHandler(this, {
			directory: path.join(__dirname, "listeners"),
		});

		this.inhibitorHandler = new InhibitorHandler(this, {
			directory: path.join(__dirname, "inhibitors"),
		});

		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			inhibitorHandler: this.inhibitorHandler,
			listenerHandler: this.listenerHandler,
		});

		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.inhibitorHandler.loadAll();
		this.listenerHandler.loadAll();
		this.commandHandler.loadAll();
	}
	async login(token) {
		await this.settings.init();
		return super.login(token);
	}
}

const client = new Client();
void client.login(config.discord.discord_token);
