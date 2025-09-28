import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { ApplicationCommandOptionType, PermissionsBitField } from 'discord.js';

export default class TrustedRoleSet extends Command {
  constructor() {
    super('trustedRoleSet', {
      name: 'trusted-role set',
      description: 'Set the trusted role in the server',
      guildOnly: true,
      category: 'trusted',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
      options: [
        {
          name: 'role',
          description: 'The role to set as trusted',
          type: ApplicationCommandOptionType.Role,
          required: true,
        },
      ],
    });
  }

  async exec(interaction) {
    const role = interaction.options.getRole('role', true);

    const trustedRoleId = await this.client.database.guild.getGuildTrustedRole(
      interaction.guildId,
    );

    if (trustedRoleId && trustedRoleId === role.id) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            `The trusted role is already set to ${role.name} (${role}).`,
          ),
        ],
      });
    }

    if (trustedRoleId) {
      await this.client.database.guild.updateGuildTrustedRole(
        interaction.guildId,
        role.id,
      );
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardSuccessEmbed().setDescription(
            `The trusted role has been updated to ${role.name} (${role}).`,
          ),
        ],
      });
    }

    await this.client.database.guild.setGuildTrustedRole(
      interaction.guildId,
      role.id,
    );

    return interaction.editReply({
      embeds: [
        EmbedFormatter.standardSuccessEmbed().setDescription(
          `The trusted role has been set to ${role.name} (${role}).`,
        ),
      ],
    });
  }
}
