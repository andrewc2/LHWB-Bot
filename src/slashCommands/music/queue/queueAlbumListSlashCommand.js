const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { db } = require('../../../models/db');
const { isMusicServer } = require('../../../utilities/permissions');

module.exports = class QueueAlbumListSlashCommand extends SlashCommand {
  constructor() {
    super('queueAlbumList', {
      name: 'queue album-list',
      prefixId: 'queueableAlbums',
      category: 'music',
      channel: 'guild',
      commandType: 'sub',
      parentCommand: 'queue',
      shortName: 'album-list',
    });
  }

  userPermissions(message) {
    return isMusicServer(message);
  }

  async exec(interaction) {
    await interaction.deferReply();
    db.query('SELECT album FROM song_detail WHERE is_album = 1 GROUP BY album', function(err, result) {
      const queueableAlbums = result.map((x, i = 0) =>
        `${i + 1}. ${x['album']}`,
      );

      const embed = new EmbedBuilder()
        .setColor('#FF69B4')
        .setTitle('Queueable Albums:')
        .setDescription(queueableAlbums.join('\n'))
        .setURL('https://lhwb.dev/lhwb.php');

      return interaction.editReply({ embeds: [embed] });
    });
  }
};
