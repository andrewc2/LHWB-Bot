import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { ChatInputCommandInteraction, PermissionsBitField } from 'discord.js';

import Utilities from '../../modules/tool/Utilities.js';

export default class Voice extends Command {
  constructor() {
    super('voice', {
      name: 'voice',
      description: 'Join the servers voice channel',
      guildOnly: true,
      category: 'music',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
    });
  }

  async exec(interaction: ChatInputCommandInteraction) {
    const server = Utilities.getMusicServer(this.client, interaction.guildId!);

    if (!server) {
      return interaction.editReply({
        embeds: [EmbedFormatter.notMusicServer()],
      });
    }

    if (!server.isInStageChannel()) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            'The bot is already in the voice channel.',
          ),
        ],
      });
    }

    server.reestablishConnection();
    return interaction.editReply({
      embeds: [
        EmbedFormatter.standardSuccessEmbed().setDescription(
          'Switched to the voice channel.',
        ),
      ],
    });
  }
}
