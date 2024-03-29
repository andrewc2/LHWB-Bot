const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class WtfSlashCommand extends SlashCommand {
  constructor() {
    super('wtf', {
      name: 'wtf',
      prefixId: 'wtf',
      category: 'other',
      commandType: 'command',
      description: 'Displays a random saved or submitted !get wtf',
    });
  }

  async exec(interaction) {
    db.query('SELECT path, type FROM media WHERE type = \'wtf\' ORDER BY RAND() LIMIT 1', function(err, rows) {
      const embed = new EmbedBuilder()
        .setColor('#FF69B4')
        .setImage(`${rows[0].path}`)
        .setFooter({
          text: 'Submit !get wtf\'s be added using: /request wtf [imgur url]',
        });
      return interaction.reply({ embeds: [embed] });
    });
  }
};
