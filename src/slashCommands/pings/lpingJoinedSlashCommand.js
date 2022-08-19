const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class LpingJoinedSlashCommand extends SlashCommand {
	constructor() {
		super('lpingJoined', {
			name: 'lping joined',
			prefixId: 'lping',
			category: 'ping',
			channel: 'guild',
			commandType: 'sub',
			parentCommand: 'lping',
			shortName: 'joined',
		});
	}

	async exec(interaction) {
		await interaction.deferReply();
		const failedEmbed = new EmbedBuilder()
			.setColor(Colors.Red)
			.setDescription('Uh oh! Looks like you\'ve not joined any pinglists in this server. You can view available pinglists in this server by using the `/lping list` command.');

		const embed = new EmbedBuilder()
			.setColor('#FF69B4')
			.setTitle('Assigned Pings');

		db.query('SELECT u.userID, p.pingID, p.name FROM User as u INNER JOIN UserPing as up ON u.userID = up.userID INNER JOIN Ping as p ON p.pingID = up.pingID WHERE p.guildID = ? AND up.userID = ?', [interaction.guild.id, interaction.user.id], function(err, result) {
			if (err) return;
			if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed] });
			const pings = result.map(i => i.name);
			return interaction.editReply({ embeds: [embed.setDescription(`\`${pings.join('` | `')}\``)] });
		});


	}
};
