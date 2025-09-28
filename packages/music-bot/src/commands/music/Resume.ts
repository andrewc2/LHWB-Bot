import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { ChatInputCommandInteraction, PermissionsBitField } from 'discord.js';

import Utilities from '../../modules/tool/Utilities.js';

export default class Resume extends Command {
  constructor() {
    super('resume', {
      name: 'resume',
      description: 'Resumes music on the bot',
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

    if (server.isPaused()) {
      server.unpause();
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardSuccessEmbed().setDescription(
            'Music has been resumed.',
          ),
        ],
      });
    } else {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            'Music is not paused at the moment.',
          ),
        ],
      });
    }
  }
}
