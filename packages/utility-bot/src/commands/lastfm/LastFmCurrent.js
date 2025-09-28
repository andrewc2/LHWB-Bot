import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';
import { ApplicationCommandOptionType } from 'discord.js';

import LastFm from '../../modules/lastfm/LastFm.js';

export default class LastFmCurrent extends Command {
  constructor() {
    super('lastFmCurrent', {
      name: 'lastfm current',
      description: 'Returns yours or another users last scrobbled song',
      category: 'lastfm',
      options: [
        {
          name: 'user',
          description:
            'The user to receive scrobble information for (defaults to you)',
          type: ApplicationCommandOptionType.User,
        },
      ],
    });
  }

  async exec(interaction) {
    const user = interaction.options.getUser('user') ?? interaction.user;

    const failedEmbed = EmbedFormatter.standardErrorEmbed().setDescription(
      `Uh oh! Looks like ${user.username} has not set their last.fm username. They can set it by using the ${DiscordUtil.formatCommandAsMention('lastfm set', this.client)} command.`,
    );

    const lastFmUsername = await LastFm.getLastFmUsername(user.id, this.client);
    if (!lastFmUsername) {
      return interaction.editReply({ embeds: [failedEmbed] });
    }

    const apiKey = this.client.config.lastfm.api_key;
    const scrobble = await LastFm.searchLastFm(lastFmUsername, apiKey, user);
    return interaction.editReply(scrobble);
  }
}
