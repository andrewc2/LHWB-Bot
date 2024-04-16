import Command from '../../structure/commands/Command.js';
import { EmbedBuilder } from 'discord.js';
import { database } from '../../models/database.js';

export default class Gif extends Command {
  constructor() {
    super('gif', {
      name: 'gif',
      category: 'other',
      description: 'Displays a random Taylor related gif',
      deploymentDetails: {
        commandType: 'command',
        integrationTypes: [0, 1],
        contexts: [0, 1, 2],
      },
    });
  }

  async exec(interaction) {
    database.query('SELECT path, type FROM media WHERE type = \'gif\' ORDER BY RAND() LIMIT 1', function(err, rows) {
      const embed = new EmbedBuilder()
        .setColor('#FF69B4')
        .setImage(`${rows[0].path}`)
        .setFooter({
          text: 'Submit gifs to be added using: /request gif [imgur url]',
        });
      return interaction.reply({ embeds: [embed] });
    });
  }
}
