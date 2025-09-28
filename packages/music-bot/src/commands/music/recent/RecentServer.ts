import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { ChatInputCommandInteraction, orderedList } from 'discord.js';

import Utilities from '../../../modules/tool/Utilities.js';

export default class Recent extends Command {
  constructor() {
    super('recentServer', {
      name: 'recent server',
      description: 'Shows the 10 most recently played songs on the server',
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

    const recent = await server.getRecent(11);
    const current = recent[0].officialName;
    recent.shift();

    const recentSongs = orderedList(
      recent.map((recent) => `${recent.officialName} - ${recent.artistName}`),
    );

    return interaction.editReply({
      embeds: [
        EmbedFormatter.standardSuccessEmbed()
          .setTitle(`Currently playing: ${current}`)
          .setDescription(`Recently Played:\n${recentSongs}`),
      ],
    });
  }
}
