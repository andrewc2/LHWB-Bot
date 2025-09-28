import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter, Paginator } from '@lhwb/shared';
import {
  ApplicationCommandOptionType,
  Colors,
  escapeMarkdown,
  PermissionFlagsBits,
} from 'discord.js';

export default class AwardRemove extends Command {
  constructor() {
    super('awardRemove', {
      name: 'award remove',
      description: 'Remove an award from a member',
      category: 'awards',
      userPermissions: [PermissionFlagsBits.ModerateMembers],
      ephemeral: true,
      options: [
        {
          name: 'user',
          description: 'The user to remove an award from',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'award-id',
          description:
            'The id of the award to remove (leave blank to view the IDs of a users awards)',
          type: ApplicationCommandOptionType.Integer,
          min_value: 0,
        },
      ],
    });
  }

  async exec(interaction) {
    const user = interaction.options.getUser('user', true);
    const awardId = interaction.options.getInteger('award-id', false);

    if (!awardId) {
      const awards = (
        await this.client.database.query(
          'SELECT * FROM userAward WHERE userId = ? AND guildId = ?',
          [user.id, interaction.guildId],
        )
      ).map(
        (award) =>
          `**ID:** ${award.id} **Award:** ${escapeMarkdown(award.description)}`,
      );

      const embedArray = Paginator.createEmbeds(
        awards,
        `Awards for ${user.displayName}`,
        Colors.Gold,
        null,
        '',
        null,
        null,
        10,
      );

      const paginator = new Paginator(
        interaction,
        embedArray,
        this.client.logger,
        false,
      );

      return await paginator.send();
    }

    const award = await this.client.database.query(
      'SELECT * FROM userAward WHERE userId = ? AND guildId = ? AND id = ?',
      [user.id, interaction.guildId, awardId],
    );

    if (!award.length) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            `${DiscordUtil.formatAsUserAndMention(user)} does not have an award with this ID. To view all of a users awards, along with their award IDs, use this command without the \`award-id\` option.`,
          ),
        ],
      });
    }

    await this.client.database.query('DELETE FROM userAward WHERE id = ?', [
      awardId,
    ]);

    return interaction.editReply({
      embeds: [
        EmbedFormatter.standardSuccessEmbed().setDescription(
          'The award has been removed successfully.',
        ),
      ],
    });
  }
}
