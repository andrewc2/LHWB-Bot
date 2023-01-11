const { db } = require('../models/db');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getCommandMention } = require('../utilities/utilities');

const autocomplete = async (interaction) => {
  if (!interaction.guild) return interaction.respond([]);
  const input = interaction.options.getString('pinglist', true).toLowerCase();
  const sql = input.length > 0
    ? 'SELECT `name`, `guildID` FROM pinglist WHERE `guildID` = ? AND `name` LIKE ? LIMIT 10'
    : 'SELECT `name`, `guildID` FROM pinglist WHERE `guildID` = ? ORDER BY `name` LIMIT 10';
  const values = input.length > 0 ? [interaction.guild.id, `${input}%`] : [interaction.guild.id];
  const [row] = await db.promise().query(sql, values);
  const result = row.map((x) => ({
    name: x.name,
    value: x.name,
  }));
  await interaction.respond(result);
};

const checkPinglistExists = async (pinglist, interaction) => {
  const [result] = await db.promise().query('SELECT `name`, `guildID` FROM pinglist WHERE name = ? AND guildID = ?', [pinglist, interaction.guild.id]);
  return result.length !== 0;
};

const pingPinglistButton = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId('send')
      .setLabel('PING MANY PEOPLE')
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('CANCEL PING')
      .setStyle(ButtonStyle.Secondary),
  );

const joinPinglistButton = (pinglist) => new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId(JSON.stringify({ type: 'ping', id: pinglist }))
      .setLabel('Join Pinglist')
      .setEmoji('🔔')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(JSON.stringify({ type: 'drop', id: pinglist }))
      .setLabel('Leave Pinglist')
      .setEmoji('🚮')
      .setStyle(ButtonStyle.Secondary),
  );

const NO_MEMBERS = 'It looks like nobody has this pinglist assigned. :confused:';
const API_MEMBER_FETCH_ERROR = 'Sorry, something went wrong while generating this pinglist.';
const PINGLIST_NOT_FOUND = (pinglist, client) => `I couldn't find a pinglist with the name ${pinglist}. You can view available pinglists in this server by using the ${getCommandMention(client, 'lping list')} command.`;

module.exports = {
  autocomplete,
  checkPinglistExists,
  pingPinglistButton,
  joinPinglistButton,
  NO_MEMBERS,
  API_MEMBER_FETCH_ERROR,
  PINGLIST_NOT_FOUND,
};
