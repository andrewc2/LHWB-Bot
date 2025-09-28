import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { PermissionsBitField } from 'discord.js';

export default class TrustedRoleView extends Command {
  constructor() {
    super('trustedRoleView', {
      name: 'trusted-role view',
      description: 'View the trusted role in the server',
      guildOnly: true,
      category: 'trusted',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
    });
  }

  async exec(interaction) {
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

    const trustedRole = interaction.guild?.roles.cache.get(trustedRoleId);

    return interaction.editReply({
      embeds: [
        EmbedFormatter.standardSuccessEmbed()
          .setTitle('Trusted Role')
          .setDescription(
            `The trusted role in this server is currently set to ${trustedRole?.name} (${trustedRole}).`,
          ),
      ],
    });
  }
}
