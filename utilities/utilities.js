const { EmbedBuilder, Colors } = require('discord.js');
const config = require('../config.json');

function anyUsage(guild, client, text) {
  return guild ? `\`${config.discord.prefix}${text}\`` : `\`${text}\``;
}

function anyUsageFooter(guild, client, text) {
  return guild ? `${config.discord.prefix}${text}` : `${text}`;
}

function commandUsage(commandName, guild, client, text) {
  const embed = new EmbedBuilder()
    .setDescription(`Invalid command usage: the **${commandName}** command's accepted format is: ${anyUsage(guild, client, text)}`)
    .setColor(Colors.Red);
  return { embeds: [embed] };
}

function getCommandMention(client, commandName) {
  if (config.slashConfig.env === 'DEV') return `\`/${commandName}\``;
  const command = client.apiCommands.find(apiCommand => apiCommand.name === commandName.split(' ')[0].trim());
  if (!command) return `\`/${commandName}\``;
  return `</${commandName}:${command.id}>`;
}

module.exports = { anyUsage, anyUsageFooter, commandUsage, getCommandMention };
