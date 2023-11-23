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
function fastFetchStore(stores) {
  const fastFetchStores = stores.filter((store) =>
    store.isFastFetchEnabled(),
  );
  fastFetchStores.forEach(async (store) => await store.post());
}

function slowFetchStore(stores) {
  const slowFetchStores = stores.filter(
    (store) => !store.isFastFetchEnabled(),
  );
  slowFetchStores.forEach(async (store) => await store.post());
}

function enableStores(stores) {
  const disabledStores = stores.filter((store) => !store.isReady());
  disabledStores.filter((store) => setTimeout(() => store.enableStore(), 10000));
}

function isJSON(string) {
  let check = true;
  try {
    JSON.parse(string);
  }
  catch (e) {
    check = false;
  }
  return check;
}

module.exports = { anyUsage, anyUsageFooter, commandUsage, getCommandMention, fastFetchStore, slowFetchStore, isJSON, enableStores };
