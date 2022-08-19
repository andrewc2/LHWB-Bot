const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { permissionType } = require('../../../utilities/permissions');
const { anyUsage } = require('../../../utilities/utilities');
const { db } = require('../../../models/db');

module.exports = class SpamRemoveMessageCommand extends MessageCommand {
	constructor() {
		super('spamRemove', {
			aliases: ['spam remove'],
			category: 'permissions',
			channel: 'guild',
			description: {
				content: 'Removes a spam channel from a server.',
				usage: 'spam remove <channel>',
				examples: [
					'spam remove #bots',
				],
			},
			args: [
				{
					id: 'channel',
					type: 'textChannel',
					match: 'content',
					default: message => message.channel,
				},
			],
		});
	}

	exec(message, { channel }) {
		db.query('SELECT * FROM permissions WHERE guild_id = ? AND channel_id = ? AND permission_type = ?', [message.guild.id, channel.id, permissionType.CHANNEL], function(err, row) {
			if (row.length === 0) {
				const isNotSpamEmbed = new EmbedBuilder()
					.setDescription(`${channel.name} is not a spam channel. Do ${anyUsage(message.guild, message.client, `spam add ${channel.name}`)} to add ${channel.name} as a spam channel.`)
					.setColor(Colors.Red);
				return message.channel.send({ embeds: [isNotSpamEmbed] });
			}

			const embed = new EmbedBuilder()
				.setDescription(`Successfully removed ${channel.name} as a spam channel. To re-add ${channel.name} as a spam channel, use the ${anyUsage(message.guild, message.client, 'spam add')} command.`)
				.setColor(Colors.DarkBlue);

			db.query('DELETE FROM permissions WHERE guild_id = ? AND channel_id = ? and permission_type = ?', [message.guild.id, channel.id, permissionType.CHANNEL]);
			return message.channel.send({ embeds: [embed] });
		});
	}
};
