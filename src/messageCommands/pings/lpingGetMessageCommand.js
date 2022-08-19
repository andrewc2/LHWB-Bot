const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');
// const { commandUsage, anyUsage } = require("../../utilities/utilities");

module.exports = class LpingGetMessageCommand extends MessageCommand {
	constructor() {
		super('lpingGet', {
			aliases: ['lping get'],
			category: 'ping',
			channel: 'guild',
			description: {
				content: 'Add user to the specified pinglist.',
				usage: 'lping get [name]',
				examples: [
					'lping get chase',
				],
			},
			args: [
				{
					id: 'name',
					type: 'lowercase',
					otherwise: 'tbd',
				},
			],
		});
	}

	exec(message, args) {
		// TBD anyUsage
		const failedEmbed = new EmbedBuilder()
			.setColor(Colors.Red)
			.setDescription('Uh oh! Looks like this pinglist does not exist.\nYou can view available pinglists in this server by doing  or `/lping list`');

		const embed = new EmbedBuilder()
			.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ forceStatic: false, extension: 'png' }), url: message.author.displayAvatarURL({ forceStatic: false, extension: 'png' }) })
			.setColor('#FF69B4');

		db.query('SELECT `name`, `guildID` FROM Ping WHERE name = ? AND guildID = ?', [args.name, message.guild.id], function(err, result) {
			if (err) return;
			if (result.length < 1) return message.channel.send({ embeds: [failedEmbed] });
			db.query('SELECT u.userID, p.pingID, p.name FROM User as u INNER JOIN UserPing as up ON u.userID = up.userID INNER JOIN Ping as p ON p.pingID = up.pingID WHERE p.guildID = ? AND up.userID = ? AND p.name = ?', [message.guild.id, message.author.id, args.name], function(err, result2) {
				if (result2.length > 0) return message.channel.send({ embeds: [failedEmbed.setDescription(`You are already apart of the ${result2[0].name} pinglist in this server.`)] });
				db.query('INSERT INTO UserPing (userID, pingID) SELECT u.userID, p.pingID FROM User as u, Ping as p WHERE u.userID = ? AND p.name = ? AND p.guildID = ?', [message.author.id, args.name, message.guild.id]);
				return message.channel.send({ embeds: [embed.setDescription(`You have been successfully added to the ${args.name} pinglist.`)] });
			});
		});
	}
};
