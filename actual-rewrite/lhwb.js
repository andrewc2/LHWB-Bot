const Discord = require("discord.js");
const config = require("./auth.json");
const fs = require("fs");

const lhwb = new Discord.Client();
lhwb.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands");

for (const file of commandFiles) {
	const mCommand = require(`./commands/${file}`);
	lhwb.commands.set(mCommand.name, mCommand);
}

lhwb.on("ready", () => {
	console.log("Ready.");
});

lhwb.on("message", message => {
	const params = message.content.slice(config.bot.prefix.length).split(/ +/g);
	const command = params.shift().toLowerCase();
	
	if (message.content.startsWith(config.bot.prefix)) {
		try {
			lhwb.commands.get(command).execute(lhwb, message, params);
		} catch (err) {
			console.log(err);
		}
	}
});
lhwb.login(config.bot.token);
