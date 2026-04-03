import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { PermissionsBitField } from 'discord.js';

export default class TrustedRoleClear extends Command {
  constructor() {
    super('trustedRoleClear', {
      name: 'trusted-role clear',
      description: 'Clear the trusted role in the server',
      guildOnly: true,
      category: 'trusted',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
    });
  }

  /**
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   */
  async exec(interaction) {
    if (!interaction.inCachedGuild()) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            'This command can only be used in a server.',
          ),
        ],
      });
    }

    const trustedRoleId = await this.client.database.guild.getGuildTrustedRole(
      interaction.guildId,
    );

    if (!trustedRoleId) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            'The trusted role has not been set in this server.',
          ),
        ],
      });
    }

    await this.client.database.guild.clearGuildTrustedRole(interaction.guildId);

    return interaction.editReply({
      embeds: [
        EmbedFormatter.standardSuccessEmbed().setDescription(
          'Successfully cleared the trusted role.',
        ),
      ],
    });
  }
}
