import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';

import LastFm from '../../modules/lastfm/LastFm.js';

export default class LastFmClear extends Command {
  constructor() {
    super('lastFmClear', {
      name: 'lastfm clear',
      description: 'Clears your last.fm username',
      category: 'lastfm',
    });
  }

  async exec(interaction) {
    const existingUsername = await LastFm.getLastFmUsername(
      interaction.user.id,
      this.client,
    );

    const embed = EmbedFormatter.standardErrorEmbed().setDescription(
      `You currently don't have a last.fm username set. You can set your username by using the ${DiscordUtil.formatCommandAsMention('lastfm set', this.client)} command.`,
    );

    if (!existingUsername) {
      return interaction.editReply({
        embeds: [embed],
      });
    }

    await this.client.database.query('DELETE FROM lastfm WHERE userId = ?', [
      interaction.user.id,
    ]);

    const response = EmbedFormatter.standardSuccessEmbed().setDescription(
      `Your last.fm username has been successfully cleared!`,
    );

    return interaction.editReply({ embeds: [response] });
  }
}
