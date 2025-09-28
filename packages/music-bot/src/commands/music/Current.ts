import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { ChatInputCommandInteraction } from 'discord.js';

import Utilities from '../../modules/tool/Utilities.js';

export default class Current extends Command {
  constructor() {
    super('current', {
      name: 'current',
      description: 'Shows what song is currently playing',
      guildOnly: true,
      category: 'music',
    });
  }

  async exec(interaction: ChatInputCommandInteraction) {
    const server = Utilities.getMusicServer(this.client, interaction.guildId!);

    if (!server) {
      return interaction.editReply({
        embeds: [EmbedFormatter.notMusicServer()],
      });
    }

    const recent = (await server.getRecent(1))[0];
    const queuedBy = recent.queuedBy;

    return interaction.editReply({
      embeds: [
        EmbedFormatter.standardSuccessEmbed()
          .setTitle(recent.officialName)
          .setDescription(`${recent.albumName} - ${recent.artistName}`)
          .setThumbnail(recent.albumArtworkUrl)
          .setFooter(queuedBy ? { text: `Queued by: ${queuedBy}` } : null),
      ],
    });
  }
}
