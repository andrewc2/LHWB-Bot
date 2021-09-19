const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

function anyUsage(guild, client, text) {
	if (guild) {
		return `\`${client.settings.get(guild.id, "prefix", config.discord.prefix)}${text}\``;
	}
	else {
		return `\`${text}\``;
	}
}

function anyUsageFooter(guild, client, text) {
	if (guild) {
		return `${client.settings.get(guild.id, "prefix", config.discord.prefix)}${text}`;
	}
	else {
		return `${text}`;
	}
}

function commandUsage(commandName, guild, client, text) {
	const embed = new MessageEmbed()
		.setDescription(`Invalid command usage: the \`${commandName}\` command's accepted format is: ${anyUsage(guild, client, text)}`)
		.setColor("RED");
	return { embeds: [embed] };
}

module.exports = { anyUsage, anyUsageFooter, commandUsage };
