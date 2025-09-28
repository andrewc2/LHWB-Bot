import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';
import { ApplicationCommandOptionType } from 'discord.js';

import Ping from '../../modules/ping/Ping.js';

export default class LpingGet extends Command {
  constructor() {
    super('lpingGet', {
      name: 'lping get',
      description: 'Join a pinglist',
      category: 'ping',
      options: [
        {
          name: 'pinglist',
          description: 'The name of the pinglist to get',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
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

    const alreadyJoined =
      (
        await this.client.database.query(
          'SELECT u.userId, p.id, p.name FROM user as u INNER JOIN userPinglist as up ON u.userId = up.userId INNER JOIN pinglist as p ON p.id = up.pinglistId WHERE p.guildId = ? AND up.userId = ? AND p.name = ?',
          [interaction.guild.id, interaction.user.id, name],
        )
      ).length > 0;

    const alreadyJoinedEmbed =
      EmbedFormatter.standardErrorEmbed().setDescription(
        `You are already a part of the **${name}** pinglist in this server.`,
      );

    if (alreadyJoined) {
      return interaction.editReply({ embeds: [alreadyJoinedEmbed] });
    }

    await this.client.database.query(
      'INSERT INTO userPinglist (userId, pinglistId) SELECT u.userId, p.id FROM user as u, pinglist as p WHERE u.userId = ? AND p.name = ? AND p.guildId = ?',
      [interaction.user.id, name, interaction.guild.id],
    );

    const successEmbed = EmbedFormatter.standardSuccessEmbed().setDescription(
      `You have successfully been added to the **${name}** pinglist.`,
    );

    return interaction.editReply({
      embeds: [successEmbed],
      components: [Ping.pinglistJoinButton(name)],
    });
  }

  async autocomplete(interaction) {
    await Ping.pingAutocomplete(interaction, this.client);
  }
}
