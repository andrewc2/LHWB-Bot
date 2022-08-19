const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');
const { searchLastFm } = require('../../commandUtilities/lastFmUtilities');

module.exports = class LastFmSearchSlashCommand extends SlashCommand {
	constructor() {
		super('lastFmSearch', {
			name: 'lastfm search',
			prefixId: 'lastFm',
			category: 'lastfm',
			commandType: 'sub',
			parentCommand: 'lastfm',
			shortName: 'search',
			slashOptions: [
				{
					name: 'username',
					description: 'The last.fm username you\'d like to search',
					type: ApplicationCommandOptionType.String,
					required: true,
					min_length: 2,
					max_length: 15,
				},
			],
		});
	}

	async exec(interaction) {
		await interaction.deferReply();
		const username = interaction.options.getString('username', true);
		return interaction.editReply(await searchLastFm(username));
	}
};
