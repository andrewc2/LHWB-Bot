import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType, EmbedBuilder, Colors } from 'discord.js';

export default class OwnerSay extends Command {
  constructor() {
    super('ownerSay', {
      name: 'owner say',
      category: 'owner',
      ownerOnly: true,
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
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'owner',
        shortName: 'say',
      },
    });
  }

  exec(interaction) {
    const embed = new EmbedBuilder()
      .setDescription('Message sent')
      .setColor(Colors.Green);

    const failEmbed = new EmbedBuilder()
      .setDescription('Something went wrong')
      .setColor(Colors.Red);

    const channelId = interaction.options.getString('channel-id', true);
    const text = interaction.options.getString('text', true);
    this.client.channels.cache.get(channelId).send(text)
      .then(() => interaction.reply({ embeds: [embed], ephemeral: true }))
      .catch(() => interaction.reply({ embeds: [failEmbed], ephemeral: true }));
  }
}
