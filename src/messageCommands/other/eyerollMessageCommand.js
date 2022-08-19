const { MessageCommand } = require('discord-akairo');

module.exports = class EyerollMessageCommand extends MessageCommand {
	constructor() {
		super('eyeroll', {
			aliases: ['eyeroll'],
			category: 'other',
			description: {
				content: 'Sends a :eyeroll: to chat.',
				usage: 'eyeroll',
				examples: [
					'eyeroll',
				],
			},
		});
	}

	exec(message) {
		message.channel.send(':rolling_eyes:');
	}
};
