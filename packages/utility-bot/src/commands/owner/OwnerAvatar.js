import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { ApplicationCommandOptionType } from 'discord.js';

export default class OwnerAvatar extends Command {
  constructor() {
    super('ownerAvatar', {
      name: 'owner avatar',
      description: 'Change the bots avatar',
      category: 'owner',
      ownerOnly: true,
      options: [
        {
          name: 'picture',
          description: 'The picture to change the bots avatar to',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: 'selena',
              value: 'https://cdn.lhwb.dev/i/SelenaAvatar.png',
            },
            {
              name: 'taylor',
              value: 'https://cdn.lhwb.dev/i/TaylorAvatar.png',
            },
            {
              name: 'test',
              value: 'https://cdn.lhwb.dev/i/TestBotAvatar.png',
            },
          ],
        },
      ],
    });
  }

  /**
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   */
  async exec(interaction) {
    const avatar = interaction.options.getString('picture', true);

    if (!this.client.user) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            'The bot user is not available yet. Please try again in a moment.',
          ),
        ],
      });
    }

    const embed = EmbedFormatter.standardSuccessEmbed().setDescription(
      'The avatar has been updated',
    );

    await this.client.user.setAvatar(avatar);

    return interaction.editReply({ embeds: [embed] });
  }
}
