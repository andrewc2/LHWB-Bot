import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';
import { ApplicationCommandOptionType, PermissionsBitField } from 'discord.js';

import Ping from '../../modules/ping/Ping.js';

export default class LpingDelete extends Command {
  constructor() {
    super('lpingDelete', {
      name: 'lping delete',
      description: 'Delete a pinglist',
      category: 'ping',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
      options: [
        {
          name: 'pinglist',
          description: 'The pinglist to delete',
          type: ApplicationCommandOptionType.String,
          required: true,
          max_length: 40,
        },
      ],
    });
  }

  async exec(interaction) {
    const name = interaction.options
      .getString('pinglist', true)
      .replace(/\s/g, '')
      .toLowerCase();

    const failedEmbed = EmbedFormatter.standardErrorEmbed().setDescription(
      `I couldn't find a pinglist with the name ${name}. You can view available pinglist's in this server by using the ${DiscordUtil.formatCommandAsMention('lping list', this.client)} command.`,
    );

    const pinglistExists = await Ping.pinglistExists(
      name,
      interaction.guild.id,
      this.client,
    );

    if (!pinglistExists) {
      return interaction.editReply({
        embeds: [failedEmbed],
      });
    }

    await this.client.database.query(
      'DELETE FROM pinglist WHERE name = ? AND guildId = ?',
      [name, interaction.guild.id],
    );

    const successEmbed = EmbedFormatter.standardSuccessEmbed().setDescription(
      `Successfully deleted the **${name}** pinglist.`,
    );

    return interaction.editReply({ embeds: [successEmbed] });
  }
}
