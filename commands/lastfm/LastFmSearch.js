import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType } from 'discord.js';
import { searchLastFm } from '../../commandUtilities/lastFmUtilities.js';

export default class LastFmSearch extends Command {
  constructor() {
    super('lastFmSearch', {
      name: 'lastfm search',
      category: 'lastfm',
      options: [
        {
          name: 'username',
          description: 'The last.fm username you\'d like to search',
          type: ApplicationCommandOptionType.String,
          required: true,
          min_length: 2,
          max_length: 15,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'lastfm',
        shortName: 'search',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const username = interaction.options.getString('username', true);
    return interaction.editReply(await searchLastFm(username));
  }
}
