const { Listener } = require('discord-akairo');
const { Events } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class InteractionCreateListener extends Listener {
	constructor() {
		super('interactionCreate', {
			emitter: 'client',
			category: 'client',
			event: Events.InteractionCreate,
		});
	}

	exec(interaction) {
		db.query('SELECT * FROM `User` WHERE `userID` = ?', [interaction.user.id], function(err, result) {
			if (err) return;
			if (result.length < 1) return db.query('INSERT INTO `User` (`userID`) VALUES (?)', [interaction.user.id]);
		});
	}
};
