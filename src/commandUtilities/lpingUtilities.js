const { db } = require('../models/db');

const autocomplete = async (interaction) => {
	if (!interaction.guild) return interaction.respond([]);
	const input = interaction.options.getString('pinglist', true).toLowerCase();
	const sql = input.length > 0
		? 'SELECT `name`, `guildID` FROM `Ping` WHERE `guildID` = ? AND `name` LIKE ? LIMIT 10'
		: 'SELECT `name`, `guildID` FROM `Ping` WHERE `guildID` = ? ORDER BY `name` LIMIT 10';
	const values = input.length > 0 ? [interaction.guild.id, `${input}%`] : [interaction.guild.id];
	const [row] = await db.promise().query(sql, values);
	const result = row.map((x) => ({
		name: x.name,
		value: x.name,
	}));
	await interaction.respond(result);
};

module.exports = { autocomplete };
