import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';
import { ApplicationCommandOptionType, PermissionsBitField } from 'discord.js';

import Ping from '../../modules/ping/Ping.js';

export default class LpingCreate extends Command {
  constructor() {
    super('lpingCreate', {
      name: 'lping create',
      description: 'Create a pinglist',
      category: 'ping',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
      options: [
        {
          name: 'pinglist',
          description: 'The name of the pinglist to be created',
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
      `Uh oh! Looks like this pinglist already exists with this name. You can view available pinglist's in this server by using the ${DiscordUtil.formatCommandAsMention('lping list', this.client)} command.`,
    );

    const pinglistExists = await Ping.pinglistExists(
      name,
      interaction.guild.id,
      this.client,
    );

    if (pinglistExists) {
      return interaction.editReply({
        embeds: [failedEmbed],
      });
    }

    await this.client.database.query(
      'INSERT INTO pinglist (`name`, `guildId`) VALUES (?,?)',
      [name, interaction.guild.id],
    );

    const successEmbed = EmbedFormatter.standardSuccessEmbed().setDescription(
      `Successfully created the **${name}** pinglist.`,
    );

    return interaction.editReply({
      embeds: [successEmbed],
      components: [Ping.pinglistJoinButton(name)],
    });
  }
}
