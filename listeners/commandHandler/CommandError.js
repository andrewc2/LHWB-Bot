import Listener from '../../structure/listeners/Listener.js';
import { EmbedBuilder, Colors } from 'discord.js';
import Logger from '../../utilities/Logger.js';

export default class CommandError extends Listener {
  constructor() {
    super('commandError', {
      event: 'error',
      category: 'commandHandler',
      emitter: 'commandHandler',
    });
  }

  async exec(err, interaction, command) {
    Logger.error(`CommandHandler Error: ${err} With Command: ${command.id}`);

    const embed = new EmbedBuilder()
      .setDescription('An unknown error occurred. :pensive:')
      .setColor(Colors.Red);

    const repliedOrDeferred = interaction.deferred ?? interaction.replied;

    return repliedOrDeferred
      ? interaction.editReply({ embeds: [embed] })
      : interaction.reply({ embeds: [embed], ephemeral: true });
  }
}
