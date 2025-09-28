import { stringify } from 'querystring';

import { EmbedFormatter } from '@lhwb/shared';

export default class LastFm {
  static async searchLastFm(username, token, user) {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?${stringify({
        method: 'user.getrecenttracks',
        api_key: token,
        extended: 1,
        user: username,
        format: 'json',
      })}`,
    );

    const response = await res.json();

    if (Object.prototype.hasOwnProperty.call(response, 'error')) {
      return this.lastFmError(response['message']);
    }

    if (response['recenttracks']['track'].length < 2) {
      return this.lastFmError("This user hasn't listened to enough music yet.");
    }

    const status = response['recenttracks']['track'][0]['@attr']
      ? 'Now Playing'
      : 'Most Recent';
    const nowPlaying = response['recenttracks']['track'][0]['@attr']
      ? 'Currently Scrobbling'
      : `Last scrobbled on: ${response['recenttracks']['track'][0]['date']['#text']} (UTC)`;
    const thumbnail = response['recenttracks']['track'][0]['image'][3]['#text'];
    const userDetails = response['recenttracks']['@attr'];

    const embed = EmbedFormatter.plainEmbed('#FF69B4')
      .setAuthor({
        name: userDetails['user'],
        iconURL:
          user?.displayAvatarURL({ forceStatic: false, extension: 'png' }) ??
          null,
        url: `https://www.last.fm/user/${userDetails['user']}`,
      })
      .addFields([
        {
          name: `${status} Song`,
          value: `${response['recenttracks']['track'][0]['name']}`,
          inline: true,
        },
        {
          name: `${status} Artist`,
          value: `${response['recenttracks']['track'][0]['artist']['name']}`,
          inline: true,
        },
        { name: '\u200b', value: '\u200b', inline: true },
        {
          name: 'Previous Song',
          value: `${response['recenttracks']['track'][1]['name']}`,
          inline: true,
        },
        {
          name: 'Previous Artist',
          value: `${response['recenttracks']['track'][1]['artist']['name']}`,
          inline: true,
        },
        { name: '\u200b', value: '\u200b', inline: true },
      ])
      .setThumbnail(thumbnail.length === 0 ? null : thumbnail)
      .setFooter({
        text: `Total Scrobbles: ${userDetails['total']} - ${nowPlaying}`,
      });

    return { embeds: [embed] };
  }

  static async getLastFmUsername(userId, client) {
    const result = await client.database.query(
      'SELECT * FROM lastfm WHERE userId = ?',
      [userId],
    );

    if (result.length === 0) return undefined;
    return result[0].username;
  }

  static lastFmError(error) {
    const embed = EmbedFormatter.standardErrorEmbed().setDescription(
      `Last.fm returned an error: **${error}**\nThe site might be down. Please try again later.`,
    );
    return { embeds: [embed] };
  }
}
