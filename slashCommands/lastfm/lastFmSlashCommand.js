const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class LastFmSlashCommand extends SlashCommand {
  constructor() {
    super('lastfm', {
      commandType: 'command',
      name: 'lastfm',
      description: 'Retrieve data from last.fm about a users scrobbling history',
      slashOptions: [
        {
          name: 'current',
          description: 'Returns yours or another users last scrobbled song',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'search',
          description: 'Search for a lastfm profile to see what its last scrobbled song was',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'set',
          description: 'Sets your lastfm profile',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'clear',
          description: 'Clears your last.fm username from the database',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
