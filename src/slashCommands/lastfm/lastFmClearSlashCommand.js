const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { findLastFmUser } = require('../../commandUtilities/lastFmUtilities');
const { db } = require('../../models/db');

module.exports = class LastFmClearSlashCommand extends SlashCommand {
  constructor() {
    super('lastFmClear', {
      name: 'lastfm clear',
      prefixId: 'lastFm',
      category: 'lastfm',
      commandType: 'sub',
      parentCommand: 'lastfm',
      shortName: 'clear',
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const embed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription('You currently don\'t have a lastfm username set. You can set your username by using the `/lastfm set` command');

    const lastFmUsername = await findLastFmUser(interaction.user);
    if (!lastFmUsername) {
      return interaction.editReply({ embeds: [embed] });
    }
    else {
      db.query('DELETE FROM lastfm WHERE discordID=?', [interaction.user.id]);
      embed
        .setColor('#FF69B4')
        .setDescription('Your last.fm username has been successfully cleared!');
      return interaction.editReply({ embeds: [embed] });
    }
  }
};
