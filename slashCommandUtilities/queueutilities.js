const { db } = require("../models/db");

const autocomplete = async (interaction) => {
    if (!interaction.guild) return interaction.respond([]);
    const input = interaction.options.getString('track', true).toLowerCase();
    const sql = input.length > 0
        ? 'SELECT `song_name` FROM `song_name` WHERE `song_name` LIKE ? LIMIT 10'
        : 'SELECT `song_name` FROM `song_name` ORDER BY `song_name` LIMIT 10';
    const values = input.length > 0 ? [`${input}%`] : [];
    const [row] = await db.promise().query(sql, values);
    const result = row.map((x) => ({
        name: x.song_name,
        value: x.song_name,
    }));
    await interaction.respond(result);
};

module.exports = { autocomplete };
