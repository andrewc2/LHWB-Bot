const { MessageCommand } = require('discord-akairo');

module.exports = class DancMessageCommand extends MessageCommand {
	constructor() {
		super('danc', {
			aliases: ['danc'],
			category: 'other',
			description: {
				content: 'Sends a :thinking: to chat.',
				usage: 'danc',
				examples: [
					'danc',
				],
			},
		});
	}

	exec(message) {
		message.channel.send(':thinking: :partying_face: :tada:');
	}
};
