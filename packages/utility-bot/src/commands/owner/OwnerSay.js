import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { ApplicationCommandOptionType } from 'discord.js';

export default class OwnerSay extends Command {
  constructor() {
    super('ownerSay', {
      name: 'owner say',
      description: 'Speak as the bot',
      category: 'owner',
      ownerOnly: true,
      ephemeral: true,
      options: [
        {
          name: 'channel-id',
          description: 'The channel id to send the message to',
          type: ApplicationCommandOptionType.String,
          required: true,
          max_length: 20,
        },
        {
          name: 'text',
          description: 'The message to send',
          type: ApplicationCommandOptionType.String,
          required: true,
          max_length: 1000,
        },
      ],
    });
  }

  async exec(interaction) {
    const channelId = interaction.options.getString('channel-id', true);
    const text = interaction.options.getString('text', true);

    const successEmbed =
      EmbedFormatter.standardSuccessEmbed().setDescription('Message sent');

    const failEmbed = EmbedFormatter.standardErrorEmbed().setDescription(
      'Something went wrong. Please try again.',
    );

    const channel = await this.client.channels.cache.get(channelId);

    if (!channel.isSendable()) {
      return interaction.editReply({
        embed: [failEmbed],
      });
    }

    return await channel
      .send(text)
      .then(() => interaction.editReply({ embeds: [successEmbed] }))
      .catch(() => interaction.editReply({ embeds: [failEmbed] }));
  }
}
