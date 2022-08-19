const { MessageCommand } = require('discord-akairo');

module.exports = class TaylorBowlMessageCommand extends MessageCommand {
	constructor() {
		super('taylorbowl', {
			aliases: ['taylorbowl', 'gettier', 'tier', 'taybowl', 'bowl', 'sbowl', 'allmatchups', 'bowlstats'],
			category: 'other',
			description: {
				content: 'kek',
				usage: 'taylorbowl',
				examples: [
					'taylorbowl',
				],
			},
		});
	}

	exec(message) {
		message.channel.send('<:taybowl:766913883386019860>');
	}
};
