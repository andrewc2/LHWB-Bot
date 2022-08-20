const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const fs = require('fs');
const { db } = require('../../models/db');
const { GET_ALBUM, QUEUE_ALBUM, SEARCH_QUEUE } = require('../../models/musicQueries');
const { dequeue } = require('../../utilities/music');
const config = require('../../config.json');
const { isVoiceServerAndMod } = require('../../utilities/permissions');
// const { commandUsage } = require('../../utilities/utilities');

module.exports = class QueueAlbumMessageCommand extends MessageCommand {
  constructor() {
    super('queueAlbum', {
      aliases: ['queue album', 'qa'],
      category: 'music',
      description: {
        content: 'Queues an album.',
        usage: 'queue album [song]',
        examples: ['queue Red'],
      },
      args: [
        {
          id: 'album',
          type: 'lowercase',
          match: 'content',
          otherwise: 'tbd',
        },
      ],
    });
  }

  userPermissions(message) {
    return isVoiceServerAndMod(message);
  }

  async exec(message, { album }) {
    const successEmbed = new EmbedBuilder().setColor(Colors.Green);
    const failedEmbed = new EmbedBuilder().setColor(Colors.Red);

    const [result] = await db.promise().query(GET_ALBUM, [album]);
    if (result.length === 0) {
      return message.channel.send({
        embeds: [
          failedEmbed.setDescription('Sorry, I couldn\'t find this album. Please try again with a different album.'),
        ],
      });
    }

    db.query(SEARCH_QUEUE, [message.guild.id], function(err, result2) {
      if (result2.length === 0) return;
      result2.forEach((song) => {
        if (song['album'].toLowerCase() === album) {
          dequeue(song['song_detail_id'], message.guild.id);
        }
      });
    });

    const playableSongs = [];
    result.forEach((song) => {
      const exists = fs.existsSync(`${config.music.filepath}${song.path}`);
      if (exists) {
        playableSongs.push([song.id, message.guild.id, message.author.tag]);
      }
    });

    if (playableSongs.length > 0) {
      db.query(QUEUE_ALBUM, [playableSongs]);
      return message.channel.send({
        embeds: [
          successEmbed.setDescription(`${result[0]['album']} has been queued.`),
        ],
      });
    }

    return message.channel.send({
      embeds: [
        failedEmbed.setDescription(`Unable to queue ${result[0]['album']}.`),
      ],
    });
  }
};
