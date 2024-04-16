import Command from '../../structure/commands/Command.js';
import { EmbedBuilder } from 'discord.js';
import { database } from '../../models/database.js';

export default class Wtf extends Command {
  constructor() {
    super('wtf', {
      name: 'wtf',
      category: 'other',
      description: 'Displays a random saved or submitted !get wtf',
      deploymentDetails: {
        commandType: 'command',
        integrationTypes: [0, 1],
        contexts: [0, 1, 2],
      },
    });
  }

  async exec(interaction) {
    database.query('SELECT path, type FROM media WHERE type = \'wtf\' ORDER BY RAND() LIMIT 1', function(err, rows) {
      const embed = new EmbedBuilder()
        .setColor('#FF69B4')
        .setImage(`${rows[0].path}`)
        .setFooter({
          text: 'Submit !get wtf\'s be added using: /request wtf [imgur url]',
        });
      return interaction.reply({ embeds: [embed] });
    });
  }
}
