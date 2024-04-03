import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType } from 'discord.js';

export default class LastFm extends Command {
  constructor() {
    super('lastfm', {
      name: 'lastfm',
      description: 'Retrieve data from last.fm about a users scrobbling history',
      options: [
        {
          name: 'current',
          description: 'Returns yours or another users last scrobbled song',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'search',
          description: 'Search for a last.fm profile to see what its last scrobbled song was',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'set',
          description: 'Sets your last.fm profile',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'clear',
          description: 'Clears your last.fm username from the database',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
      deploymentDetails: {
        commandType: 'command',
      },
    });
  }
}
