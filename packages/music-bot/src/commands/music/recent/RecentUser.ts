import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import {
  ChatInputCommandInteraction,
  ApplicationCommandOptionType,
  orderedList,
} from 'discord.js';

export default class RecentUser extends Command {
  constructor() {
    super('recentUser', {
      name: 'recent user',
      description: 'Shows the 10 most recently listened to songs by user',
      category: 'music',
      options: [
        {
          name: 'user',
          type: ApplicationCommandOptionType.User,
          description:
            'The name of the user to view recent songs for (defaults to you)',
          required: false,
        },
      ],
    });
  }

  async exec(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser('user') ?? interaction.user;

    const recent = await this.client.database.user.getUserSongHistory(user.id);

    if (recent.length === 0) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            `${user.username} has not listened to any songs yet.`,
          ),
        ],
      });
    }

    const recentSongs = orderedList(
      recent.map((recent) => `${recent.officialName} - ${recent.artistName}`),
    );

    return interaction.editReply({
      embeds: [
        EmbedFormatter.standardUserEmbed(interaction, user, true)
          .setTitle('Last 10 songs listened to')
          .setDescription(`Recently Played:\n${recentSongs}`),
      ],
    });
  }
}
