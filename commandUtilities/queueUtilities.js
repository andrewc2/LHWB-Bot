import { database } from '../models/database.js';
import { ALBUM_AUTOCOMPLETE, FIND_TRACK, TRACK_AUTOCOMPLETE } from '../models/musicQueries.js';

export const autocomplete = async (interaction) => {
  if (!interaction.guild) return interaction.respond([]);
  const input = interaction.options.getString('track', true).toLowerCase();
  if (!input) return interaction.respond([]);

  const [row] = await database.promise().query(TRACK_AUTOCOMPLETE, [`${input}%`]);

  const response = row.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t['official_name'] === value['official_name']
    )),
  ).map((track) => ({
    name: `${track['official_name']} - ${track['artist_name']}`,
    value: track['official_name'],
  }));

  await interaction.respond(response);
};

export const findTrack = async (trackName) => {
  const [row] = await database.promise().query(FIND_TRACK, [trackName]);
  return row[0];
};

export const albumAutocomplete = async (interaction) => {
  if (!interaction.guild) return interaction.respond([]);
  const input = interaction.options.getString('album', true).toLowerCase();
  if (!input) return interaction.respond([]);

  const [row] = await database.promise().query(ALBUM_AUTOCOMPLETE, [1, `${input}%`]);

  const result = row.map((track) => ({
    name: `${track['album']} - ${track['artist_name']}`,
    value: track['album'],
  }));

  await interaction.respond(result);
};
