import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';

export default class Mods extends Command {
  constructor() {
    super('mods', {
      name: 'mods',
      description:
        'Enables the mods ping in emergencies (unneeded pings could result in a timeout)',
      category: 'utilities',
      guildOnly: true,
      ephemeral: true,
    });
  }

  async exec(interaction) {
    const roleId = this.client.config.discord.mod_role_id;
    const modsRole = interaction.guild.roles.cache.get(roleId);

    const noRoleErrorEmbed = EmbedFormatter.standardErrorEmbed().setDescription(
      "Sorry, I can't find the defined mods role.",
    );

    if (!modsRole) {
      this.client.logger.warn(`Unable to find mods role: ${roleId}`);
      return interaction.editReply({ embeds: [noRoleErrorEmbed] });
    }

    const permissionsErrorEmbed =
      EmbedFormatter.standardErrorEmbed().setDescription(
        "Sorry, I don't have permission to edit the mods role.",
      );

    if (!modsRole.editable) {
      this.client.logger.warn(`Unable to edit the mods role: ${roleId}`);
      return interaction.editReply({ embeds: [permissionsErrorEmbed] });
    }

    const newUserErrorEmbed =
      EmbedFormatter.standardErrorEmbed().setDescription(
        'This command can only be used by members who have joined more than 2 weeks ago.',
      );

    const joinDate = interaction.member.joinedAt;
    const now = new Date();
    const joinTime = (now.getTime() - joinDate.getTime()) / 1000;

    if (joinTime < 60 * 60 * 24 * 14) {
      return await interaction.editReply({ embeds: [newUserErrorEmbed] });
    }

    const enabledEmbed = EmbedFormatter.standardSuccessEmbed()
      .setDescription(
        'The mods tag has activated. Do not continue if this is not a serious issue that needs attention and no mods are currently active.',
      )
      .setFooter({
        text: 'Otherwise, use the tag quickly, as it will be disabled in 2 minutes.',
      });

    await modsRole.setMentionable(
      true,
      `activated by ${DiscordUtil.formatAsUserAndId(interaction.user)}`,
    );

    this.client.logger.info(
      `@mods mention activated by ${DiscordUtil.formatAsUserAndId(interaction.user)}`,
    );

    await interaction.editReply({ embeds: [enabledEmbed] });

    setTimeout(() => {
      modsRole.setMentionable(false, '@mods mention deactivated');
      this.client.logger.warn('@mods mention deactivated');
    }, 120000);
  }
}
