const { Argument, MessageCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { db } = require('../../models/db');
const { RANK_PLAYS } = require('../../models/musicQueries');
const { isMusicServer } = require('../../utilities/permissions');

module.exports = class RankPlayMessageCommand extends MessageCommand {
	constructor() {
		super('rankPlay', {
			aliases: ['rankplay', 'rankplays'],
			category: 'music',
			description: {
				content: 'Shows a ranking of the most played songs. (Limited to a max of 25 songs).',
				usage: 'rankplays [number 5-25, defaults to 5]',
				examples: ['rankplays 13'],
			},
			args: [
				{
					id: 'listNum',
					type: Argument.range('number', 5, 25, true),
					default: 5,
				},
			],
		});
	}

	userPermissions(message) {
		return isMusicServer(message);
	}

	async exec(message, { listNum }) {
		db.query(RANK_PLAYS, [listNum], function(err, result) {
			const rankedPlays = result.map(
				(x, i = 0) =>
					`${i + 1}. ${x['official_name']} - ${x['play_count']}`,
			);

			const embed = new EmbedBuilder()
				.setColor('#FF69B4')
				.setTitle('Ranked Plays:')
				.setDescription(rankedPlays.join('\n'))
				.setURL('https://lhwb.dev/recent.php');

			return message.channel.send({ embeds: [embed] });
		},
		);
	}
};
