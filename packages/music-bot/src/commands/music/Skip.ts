import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { ChatInputCommandInteraction } from 'discord.js';

import Permission from '../../modules/tool/Permission.js';
import Utilities from '../../modules/tool/Utilities.js';

export default class Skip extends Command {
  constructor() {
    super('skip', {
      name: 'skip',
      description: 'Skips the current song',
      guildOnly: true,
      category: 'music',
      userPermissions: async (interaction: ChatInputCommandInteraction) => {
        return await Permission.musicTrustedPermissionsCheck(
          this.client,
          interaction,
        );
      },
    });
  }

  async exec(interaction: ChatInputCommandInteraction) {
    const server = Utilities.getMusicServer(this.client, interaction.guildId!);

    if (!server) {
      return interaction.editReply({
        embeds: [EmbedFormatter.notMusicServer()],
      });
    }

    await server.skip();

    return interaction.editReply({
      embeds: [
        EmbedFormatter.standardSuccessEmbed().setDescription(
          'Song has been skipped. Finding a new song to play.',
        ),
      ],
    });
  }
}
