import { Command } from '@lhwb/framework';
import { ApplicationCommandOptionType } from 'discord.js';

import LastFm from '../../modules/lastfm/LastFm.js';

export default class LastFmSearch extends Command {
  constructor() {
    super('lastFmSearch', {
      name: 'lastfm search',
      description:
        'Search for a last.fm profile to see what its last scrobbled song was',
      category: 'lastfm',
      options: [
        {
          name: 'username',
          description: "The last.fm username you'd like to search",
          type: ApplicationCommandOptionType.String,
          required: true,
          min_length: 2,
          max_length: 15,
        },
      ],
    });
  }

  async exec(interaction) {
    const username = interaction.options.getString('username', true);
    const apiKey = this.client.config.lastfm.api_key;
    const scrobble = await LastFm.searchLastFm(username, apiKey);
    return interaction.editReply(scrobble);
  }
}
