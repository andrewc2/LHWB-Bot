const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class GifSlashCommand extends SlashCommand {
  constructor() {
    super('gif', {
      name: 'gif',
      prefixId: 'gif',
      category: 'other',
      commandType: 'command',
      description: 'Displays a random Taylor related gif.',
    });
  }

  async exec(interaction) {
    db.query('SELECT path, type FROM media WHERE type = \'gif\' ORDER BY RAND() LIMIT 1', function(err, rows) {
      const embed = new EmbedBuilder()
        .setColor('#FF69B4')
        .setImage(`${rows[0].path}`)
        .setFooter({
          text: 'Submit gifs to be added using: /request gif [imgur url]',
        });
      return interaction.reply({ embeds: [embed] });
    });
  }
};
