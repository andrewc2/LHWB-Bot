const { Listener } = require('discord-akairo');
const { Events } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class DeleteSpamChannelOnChannelDeleteListener extends Listener {
	constructor() {
		super('deleteSpamChannelOnChannelDelete', {
			event: Events.ChannelDelete,
			emitter: 'client',
			category: 'permissions',
		});
	}

	exec(channel) {
		if (!channel.guild) return;
		db.query('DELETE FROM permissions WHERE channel_id = ?', [channel.id]);
	}
};
