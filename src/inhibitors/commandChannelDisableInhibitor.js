const { Inhibitor } = require('discord-akairo');
const { db } = require('../models/db');

module.exports = class CommandChannelDisabledInhibitor extends Inhibitor {
	constructor() {
		super('commandChannelDisabled', {
			reason: 'commandChannelDisabled',
		});
	}

	async exec(message, command) {
		if (!message.guild) return;

		const guildID = message.guild.id;
		const channelID = message.channel.id;
		const commandID = command.prefixId ?? command.id;

		const [rows] = await db.promise().query('SELECT * FROM `command` WHERE `guildID` = ? AND `channelID` = ? AND `commandID` = ?', [guildID, channelID, commandID]);
		if (rows.length > 0) return true;
	}
};
