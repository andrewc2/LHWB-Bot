import { Command } from '@lhwb/framework';
import { EmbedFormatter, DataFormatter } from '@lhwb/shared';
import {
  ChatInputCommandInteraction,
  ApplicationCommandOptionType,
  AutocompleteInteraction,
} from 'discord.js';

import QueueAutocomplete from '../../../modules/music/QueueAutocomplete.js';
import Utilities from '../../../modules/tool/Utilities.js';

export default class SongInformation extends Command {
  constructor() {
    super('songInformation', {
      name: 'song information',
      description: 'View information about a song',
      category: 'music',
      options: [
        {
          name: 'song-name',
          type: ApplicationCommandOptionType.String,
          description:
            'The name of the song to view information for (defaults to the current song)',
          required: false,
          autocomplete: true,
        },
      ],
    });
  }

  async exec(interaction: ChatInputCommandInteraction) {
    const server = Utilities.getMusicServer(this.client, interaction.guildId!);

    if (!server) {
      return interaction.editReply({
        embeds: [EmbedFormatter.notMusicServer()],
      });
    }

    const songName = interaction.options.getString('song-name', false);
    const song = songName
      ? await this.client.database.song.getSong(songName)
      : (await server.getRecent(1))[0];

    if (!song) {
      return await interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            `This song could not be found.`,
          ),
        ],
      });
    }

    return interaction.editReply({
      embeds: [
        EmbedFormatter.standardSuccessEmbed()
          .setTitle(`${song.officialName} - ${song.artistName}`)
          .setThumbnail(song.albumArtworkUrl)
          .addFields([
            {
              name: 'Album',
              value: song.albumName.toString(),
              inline: true,
            },
            {
              name: 'Track Number',
              value: song.trackNumber.toString(),
              inline: true,
            },
            {
              name: 'Play Count',
              value: DataFormatter.formatNumber(song.playCount),
              inline: true,
            },
          ]),
      ],
    });
  }

  async autocomplete(interaction: AutocompleteInteraction) {
    await QueueAutocomplete.songAutocomplete(interaction, this.client);
  }
}
