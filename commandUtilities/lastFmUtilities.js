import { EmbedBuilder, Colors } from 'discord.js';
import fetch from 'node-fetch';
import { database } from '../models/database.js';
import Utilities from '../utilities/Utilities.js';
const config = await Utilities.loadJSON('../config.json');

export const findLastFmUser = async (user) => {
  const [row] = await database.promise().query('SELECT * FROM lastfm WHERE discordID = ?', [user.id]);
  if (row.length === 0) return null;
  return row[0].lastfmUsername;
};

export const searchLastFm = async (username, user) => {
  return fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&extended=1&user=${username}&limit=2&api_key=${config.lastfm.api_key}&format=json`)
    .then(response => response.json())
    .then(response => {
      if (Object.prototype.hasOwnProperty.call(response, 'error')) {
        return lastFmErrorHelper(response['message']);
      }
      if (response['recenttracks']['track'].length < 2) {
        return lastFmErrorHelper('This user hasn\'t listened to enough music yet.');
      }

      const status = response['recenttracks']['track'][0]['@attr'] ? 'Now Playing' : 'Most Recent';
      const nowPlaying = response['recenttracks']['track'][0]['@attr'] ? 'Currently Scrobbling' : `Last scrobbled on: ${response['recenttracks']['track'][0]['date']['#text']} (UTC)`;
      const thumbnail = response['recenttracks']['track'][0]['image'][3]['#text'];
      const userDetails = response['recenttracks']['@attr'];

      const embed = new EmbedBuilder()
        .setAuthor({
          name: userDetails['user'],
          iconURL: user?.displayAvatarURL({ forceStatic: false, extension: 'png' }) ?? null,
          url: `https://www.last.fm/user/${userDetails['user']}`,
        })
        .addFields([
          { name: `${status} Song`, value: `${response['recenttracks']['track'][0]['name']}`, inline: true },
          { name: `${status} Artist`, value: `${response['recenttracks']['track'][0]['artist']['name']}`, inline: true },
          { name: '\u200b', value: '\u200b', inline: true },
          { name: 'Previous Song', value: `${response['recenttracks']['track'][1]['name']}`, inline: true },
          { name: 'Previous Artist', value: `${response['recenttracks']['track'][1]['artist']['name']}`, inline: true },
          { name: '\u200b', value: '\u200b', inline: true },
        ])
        .setThumbnail(thumbnail.length === 0 ? null : thumbnail)
        .setFooter({ text: `Total Scrobbles: ${userDetails['total']} - ${nowPlaying}` })
        .setColor('#FF69B4');

      return { embeds: [embed] };
    });
};

export const lastFmErrorHelper = (error) => {
  const embed = new EmbedBuilder()
    .setDescription(
      `Last.fm returned an error: **${error}**\nThe site might be down. Please try again later.`,
    )
    .setColor(Colors.Red);
  return { embeds: [embed] };
};
