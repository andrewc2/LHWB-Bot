import Command from '../../structure/commands/Command.js';
import { EmbedBuilder } from 'discord.js';
import { database } from '../../models/database.js';

export default class Version extends Command {
  constructor() {
    super('version', {
      name: 'version',
      description: 'Displays version information for the bot',
      category: 'utilities',
      deploymentDetails: {
        commandType: 'command',
        integrationTypes: [0, 1],
        contexts: [0, 1, 2],
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    database.query('SELECT * FROM version', function(err, rows) {
      const embed = new EmbedBuilder()
      // pink
        .setColor('#FF69B4')
        .setTitle('Patch Notes:')
        .setAuthor({
          name: `Version: ${rows[0]['versionNum']}`,
          iconURL: 'https://cdn.lhwb.dev/i/ts.png',
          url: 'https://github.com/andrewc2/LHWB-Bot/wiki/Change-Log',
        })
        .setDescription(`${rows[0]['patchNotes']}`)
        .setFooter({
          text: 'Please /request to report of any issues/bugs.',
          iconURL: interaction.client.user.displayAvatarURL({ forceStatic: false, extension: 'png' }),
        });
      return interaction.editReply({ embeds: [embed] });
    });
  }
}
