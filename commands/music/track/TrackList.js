import Command from '../../../structure/commands/Command.js';
import { EmbedBuilder } from 'discord.js';

export default class TrackList extends Command {
  constructor() {
    super('trackList', {
      name: 'track list',
      category: 'music',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'track',
        shortName: 'list',
      },
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.client.user.username} Track List`,
        iconURL: interaction.client.user.displayAvatarURL({ forceStatic: false, extension: 'png' }),
        url: interaction.client.user.displayAvatarURL({ forceStatic: false, extension: 'png' }),
      })
      .setDescription('The full requestable track list is here: https://lhwb.dev/lhwb.php')
      .setColor('#9979FF');
    return interaction.reply({ embeds: [embed] });
  }
}
