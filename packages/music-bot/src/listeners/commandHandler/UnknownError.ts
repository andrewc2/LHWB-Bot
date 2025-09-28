import { Listener, Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';

export default class UnknownError extends Listener {
  constructor() {
    super('commandError', {
      event: 'error',
      category: 'commandHandler',
      emitter: 'commandHandler',
    });
  }

  async exec(
    err: Error,
    interaction: ChatInputCommandInteraction,
    command: Command,
  ) {
    this.client.logger.error(
      `CommandHandler Error: ${err} With Command: ${command.id}`,
    );

    const embed = EmbedFormatter.standardErrorEmbed().setDescription(
      "Sorry, an unknown error occurred! I'll try to get this fixed as soon as possible :pleading_face:",
    );

    const repliedOrDeferred = interaction.deferred ?? interaction.replied;

    return repliedOrDeferred
      ? interaction.editReply({ embeds: [embed] })
      : interaction.reply({
          embeds: [embed],
          flags: [MessageFlags.Ephemeral],
        });
  }
}
