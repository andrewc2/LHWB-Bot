import { Listener } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter, Utilities } from '@lhwb/shared';
import { Events, MessageFlags } from 'discord.js';

import Ping from '../../modules/ping/Ping.js';

export default class LpingDropPinglist extends Listener {
  constructor() {
    super('lpingDropPinglist', {
      event: Events.InteractionCreate,
      category: 'ping',
      emitter: 'client',
    });
  }

  async exec(interaction) {
    if (!interaction.isButton() || !interaction.guild) return;
    const customId = interaction.customId;
    if (!Utilities.isJSON(customId)) return;
    const details = JSON.parse(customId);
    if (details.type !== 'drop') return;

    await interaction.deferReply({
      flags: [MessageFlags.Ephemeral],
    });

    const name = details.id;

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

    const alreadyJoined =
      (
        await this.client.database.query(
          'SELECT u.userId, p.id, p.name FROM user as u INNER JOIN userPinglist as up ON u.userId = up.userId INNER JOIN pinglist as p ON p.id = up.pinglistId WHERE p.guildId = ? AND up.userId = ? AND p.name = ?',
          [interaction.guild.id, interaction.user.id, name],
        )
      ).length > 0;

    const notJoinedEmbed = EmbedFormatter.standardErrorEmbed().setDescription(
      `You are not a part of the **${name}** pinglist in this server.`,
    );

    if (!alreadyJoined) {
      return interaction.editReply({ embeds: [notJoinedEmbed] });
    }

    await this.client.database.query(
      'DELETE userPinglist FROM userPinglist INNER JOIN user as u On userPinglist.userId = u.userId INNER JOIN pinglist as p on userPinglist.pinglistId = p.id WHERE p.guildId = ? AND u.userId = ? AND p.name = ?',
      [interaction.guild.id, interaction.user.id, name],
    );

    const successEmbed = EmbedFormatter.standardSuccessEmbed().setDescription(
      `You have successfully been removed from the **${name}** pinglist.`,
    );

    return interaction.editReply({ embeds: [successEmbed] });
  }
}
