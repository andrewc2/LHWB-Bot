import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';
import { ApplicationCommandOptionType } from 'discord.js';

import Ping from '../../modules/ping/Ping.js';

export default class LpingShow extends Command {
  constructor() {
    super('lpingShow', {
      name: 'lping show',
      description: 'Get details about a pinglist',
      category: 'ping',
      options: [
        {
          name: 'pinglist',
          description: 'The name of the pinglist to show',
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

    const users = await this.client.database.query(
      'SELECT u.userId FROM user as u INNER JOIN userPinglist as up ON u.userId = up.userId INNER JOIN pinglist as p ON p.id = up.pinglistId WHERE p.guildId = ? AND p.name = ?',
      [interaction.guild.id, name],
    );

    const response = EmbedFormatter.standardSuccessEmbed()
      .setTitle(name)
      .addFields([
        {
          name: 'Member Count',
          value: users.length.toString(),
          inline: true,
        },
      ]);

    return interaction.editReply({
      embeds: [response],
      components: [Ping.pinglistJoinButton(name)],
    });
  }

  async autocomplete(interaction) {
    await Ping.pingAutocomplete(interaction, this.client);
  }
}
