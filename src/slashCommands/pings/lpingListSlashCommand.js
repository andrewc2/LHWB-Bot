const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class LpingListSlashCommand extends SlashCommand {
	constructor() {
		super('lpingList', {
			name: 'lping list',
			prefixId: 'lpingList',
			category: 'ping',
			channel: 'guild',
			commandType: 'sub',
			parentCommand: 'lping',
			shortName: 'list',
		});
	}

	async exec(interaction) {
		await interaction.deferReply();

		const failedEmbed = new EmbedBuilder()
			.setColor(Colors.Red)
			.setDescription('There are no pinglists in this server. You can create a pinglist by using the `/lping create` command.');

		const embed = new EmbedBuilder()
			.setColor('#FF69B4')
			.setTitle('Server Pinglists');

		db.query('SELECT `name` FROM Ping WHERE guildID = ?', [interaction.guild.id], function(err, result) {
			if (err) return;
			if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed] });
			const pings = result.map(x => x.name);
			return interaction.editReply({ embeds: [embed.setDescription(`Here are all the pinglists available in this server. Use the \`/lping get\` command to join one.\n\n \`${pings.join('` | `')}\``)] });
		});
	}
};
