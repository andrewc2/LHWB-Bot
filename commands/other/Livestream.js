import Command from '../../structure/commands/Command.js';
import { EmbedBuilder } from 'discord.js';

export default class Livestream extends Command {
  constructor() {
    super('livestream', {
      name: 'livestream',
      category: 'other',
      description: 'Displays information about live streams',
      deploymentDetails: {
        commandType: 'command',
      },
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(5218488)
      .setAuthor({
        name: 'Live Stream',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://stream.lhwb.dev/',
      })
      .setURL('https://stream.lhwb.dev/')
      .setDescription('[HLS Stream Player](https://stream.lhwb.dev)\n\nStream will be at minimum 30sec behind from live\nIf you have issues please refresh your browser first or adjust the quality level.')
      .setFooter({ text: 'Please do not share this stream outside of this discord server, or this stream will not be able to be provided.' });
    return interaction.reply({ embeds: [embed] });
  }
}
