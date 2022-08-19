const { Listener } = require('discord-akairo');
const { Events, ActivityType } = require('discord.js');
const { logger } = require('../../utilities/winstonLogging');

module.exports = class ReadyListener extends Listener {
	constructor() {
		super('readyListener', {
			emitter: 'client',
			category: 'client',
			event: Events.ClientReady,
		});
	}

	exec() {
		logger.log('info', `Logged in as ${this.client.user.tag} (${this.client.user.id})`);
		this.client.user.setActivity('Music', { type: ActivityType.Listening });
	}
};
