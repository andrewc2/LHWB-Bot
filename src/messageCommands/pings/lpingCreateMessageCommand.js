const { MessageCommand, Argument } = require('discord-akairo');
const { EmbedBuilder, Colors, PermissionsBitField } = require('discord.js');
const { db } = require('../../models/db');
// const { commandUsage, anyUsage } = require("../../utilities/utilities");

module.exports = class LpingCreateMessageCommand extends MessageCommand {
	constructor() {
		super('lpingCreate', {
			aliases: ['lping create'],
			category: 'ping',
			channel: 'guild',
			userPermissions: [PermissionsBitField.Flags.ManageMessages],
			description: {
				content: 'Create a new pinglist for a server.',
				usage: 'lping [name]',
				examples: [
					'lping chase',
				],
			},
			args: [
				{
					id: 'name',
					type: Argument.range('lowercase', 0, 45, true),
					otherwise:'tbd',
				},
			],
		});
	}

	exec(message, args) {
		// Re-add Any Usage
		const failedEmbed = new EmbedBuilder()
			.setColor(Colors.Red)
			.setDescription('Uh oh! Looks like this pinglist already exists.\nYou can view available pinglists in this server by doing or `/lping list`');

		const embed = new EmbedBuilder()
			.setColor('#FF69B4')
			.setDescription('Successfully created the pinglist.');

		db.query('SELECT * FROM `Ping` WHERE `name` = ? AND `guildID` = ?', [args.name, message.guild.id], function(err, result) {
			if (err) return;
			for (const ping of result.values()) {
				if (ping.name === args.name) return message.channel.send({ embeds: [failedEmbed] });
			}
			db.query('INSERT INTO `Ping` (`name`, `guildID`) VALUES (?,?)', [args.name, message.guild.id]);
			return message.channel.send({ embeds: [embed] });
		});
	}
};
