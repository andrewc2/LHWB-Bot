import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';
import {
  ApplicationCommandOptionType,
  escapeMarkdown,
  PermissionFlagsBits,
} from 'discord.js';

export default class AwardAdd extends Command {
  constructor() {
    super('awardAdd', {
      name: 'award add',
      description: 'Add an award to a member',
      category: 'awards',
      userPermissions: [PermissionFlagsBits.ModerateMembers],
      options: [
        {
          name: 'user',
          description: 'The user to add an award to',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'award',
          description: 'The description of the award to add',
          type: ApplicationCommandOptionType.String,
          required: true,
          max_length: 100,
        },
      ],
    });
  }

  async exec(interaction) {
    const member = interaction.options.getMember('user');
    const award = escapeMarkdown(interaction.options.getString('award', true));

    if (!member) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            'The user must be in the server before you can give them an award.',
          ),
        ],
      });
    }

    await this.client.database.query(
      'INSERT INTO userAward (userId, guildId, description) VALUES (?,?,?)',
      [member.user.id, member.guild.id, award],
    );

    return interaction.editReply({
      embeds: [
        EmbedFormatter.standardSuccessEmbed().setDescription(
          `The award "${award}" has been added successfully to ${DiscordUtil.formatAsUserAndMention(member.user)}`,
        ),
      ],
    });
  }
}
