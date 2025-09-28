import { FrameworkClient } from '@lhwb/framework';
import { AutocompleteInteraction } from 'discord.js';

export default class QueueAutocomplete {
  static async songAutocomplete(
    interaction: AutocompleteInteraction,
    client: FrameworkClient,
  ) {
    const input = interaction.options
      .getString('song-name', true)
      .toLowerCase();
    if (!input) return interaction.respond([]);

    const songs = await client.database.song.songAutoComplete(`${input}%`);

    const response = songs
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t['officialName'] === value['officialName']),
      )
      .map((song) => ({
        name: `${song['officialName']} - ${song['artistName']}`,
        value: song['officialName'],
      }));

    await interaction.respond(response);
  }

  static async albumAutocomplete(
    interaction: AutocompleteInteraction,
    client: FrameworkClient,
  ) {
    const input = interaction.options
      .getString('album-name', true)
      .toLowerCase();
    if (!input) return interaction.respond([]);

    const albums = await client.database.song.albumAutoComplete(`${input}%`);

    const response = albums.map((album) => ({
      name: `${album['albumName']} - ${album['artistName']}`,
      value: album['albumName'],
    }));

    await interaction.respond(response);
  }
}
