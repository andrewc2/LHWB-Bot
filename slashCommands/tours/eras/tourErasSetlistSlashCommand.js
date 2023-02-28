const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { db } = require('../../../models/db');

module.exports = class ErasTourSetListSlashCommand extends SlashCommand {
  constructor() {
    super('erasTourSetList', {
      name: 'tour eras setlist',
      prefixId: 'ErasSetList',
      category: 'tours',
      commandType: 'sub',
      parentCommand: 'eras',
      shortName: 'setlist',
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    db.query('SELECT * FROM tour', function(err, rows) {
      const embed = new EmbedBuilder()
        .setColor(0x586891)
        .setAuthor({
          name: 'Typical The Eras Tour Setlist',
          iconURL:'https://lhwb.dev/ts.png',
          /* url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=3d0a56f', */
        })
        .setThumbnail('https://i.imgur.com/v0Vl7WK.png')
        .setDescription(`${rows[0]['erasSetlist']}`);

      return interaction.editReply({ embeds: [embed] });
    });
  }
};
