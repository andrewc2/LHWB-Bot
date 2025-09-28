import { Command } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { ApplicationCommandOptionType } from 'discord.js';

import LastFm from '../../modules/lastfm/LastFm.js';

export default class LastFmSet extends Command {
  constructor() {
    super('lastFmSet', {
      name: 'lastfm set',
      description: "The last.fm username you'd like to set",
      category: 'lastfm',
      options: [
        {
          name: 'username',
          description: "The last.fm username you'd like to set",
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

    const invalidUsername = EmbedFormatter.standardErrorEmbed().setDescription(
      'The username you have provided is invalid. For more information, visit [last.fm](https://www.last.fm/join)',
    );

    if (
      !/^[a-zA-Z0-9_-]+$/.test(username) ||
      !/^[a-zA-Z]+$/.test(username.charAt(0))
    ) {
      return interaction.editReply({
        embeds: [invalidUsername],
      });
    }

    const existingUsername = await LastFm.getLastFmUsername(
      interaction.user.id,
      this.client,
    );

    if (existingUsername) {
      await this.client.database.query(
        'UPDATE `lastfm` SET `username` = ? WHERE `userId` = ?',
        [username, interaction.user.id],
      );
    } else {
      await this.client.database.query(
        'INSERT INTO lastfm (username, userId) VALUES (?,?) ',
        [username, interaction.user.id],
      );
    }

    const response = EmbedFormatter.standardSuccessEmbed().setDescription(
      `Your last.fm username has been set to ${username}.`,
    );

    return interaction.editReply({ embeds: [response] });
  }
}
