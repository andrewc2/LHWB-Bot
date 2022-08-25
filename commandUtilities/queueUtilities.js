const { db } = require('../models/db');

const autocomplete = async (interaction) => {
  if (!interaction.guild) return interaction.respond([]);
  const input = interaction.options.getString('track', true).toLowerCase();
  if (!input) return interaction.respond([]);

  const sql = 'SELECT * FROM songName INNER JOIN songDetail ON songName.song_detail_id = songDetail.id WHERE songName.song_name LIKE ? LIMIT 5';
  const [row] = await db.promise().query(sql, [`${input}%`]);

  const response = row.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t['official_name'] === value['official_name']
    )),
  ).map((track) => ({
    name: `${track['official_name']} - ${track['artist_name']}`,
    value: track['song_name'],
  }));

  await interaction.respond(response);
};

module.exports = { autocomplete };
