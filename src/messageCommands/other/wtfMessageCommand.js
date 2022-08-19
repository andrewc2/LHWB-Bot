const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { db } = require('../../models/db');
const { anyUsageFooter } = require('../../utilities/utilities');

module.exports = class WtfMessageCommand extends MessageCommand {
	constructor() {
		super('wtf', {
			aliases: ['wtf'],
			category: 'other',
			description: {
				content: 'Displays a random saved !g wtf.',
				usage: 'wtf',
				examples: [
					'wtf',
				],
			},
		});
	}

	exec(message) {
		db.query('SELECT path, type FROM media WHERE type = \'wtf\' ORDER BY RAND() LIMIT 1', function(err, rows) {
			const embed = new EmbedBuilder()
				.setColor('#FF69B4')
				.setImage(`${rows[0].path}`)
				.setFooter({
					text: `Submit !g wtf's be added using: ${anyUsageFooter(message.guild, message.client, 'request wtf [imgur url]')}`,
					iconURL: message.client.user.displayAvatarURL({ forceStatic: false, extension: 'png' }),
				});
			message.channel.send({ embeds: [embed] });
		});
	}
};
