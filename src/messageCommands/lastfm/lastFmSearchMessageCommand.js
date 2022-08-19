const { MessageCommand } = require('discord-akairo');
const { commandUsage } = require('../../utilities/utilities');
const { searchLastFm } = require('../../commandUtilities/lastFmUtilities');

module.exports = class LastFmSearchMessageCommand extends MessageCommand {
	constructor() {
		super('lastFmSearch', {
			aliases: ['lfm search'],
			category: 'fm',
			description: {
				content: 'Search for a lastfm profile to see what its last scrobble was.',
				usage: 'lfm search [last.fm]',
				examples: [
					'lfm search iAndrewC',
				],
			},
			args: [
				{
					id: 'username',
					type: 'string',
					otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
				},
			],
		});
	}

	async exec(message, args) {
		return message.channel.send(await searchLastFm(args.username));
	}
};
