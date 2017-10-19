const Discord = require('discord.js');
const config = require('./auth.json');

const bot = new Discord.Client();

bot.on('ready', () => {
	console.log('LHWB is ready!');
});

bot.on('message', message => {
	var command = message.content.split(" ");
	var params = command.slice(1, command.length).join(" ");

	switch(command[0].toLowerCase()) {
		case "!lversion":
			versionCommand(message);
			break;
	}
});

function versionCommand(message) {
	message.channel.send("Running version: " + config.bot.version);
}

bot.login(config.bot.token);
