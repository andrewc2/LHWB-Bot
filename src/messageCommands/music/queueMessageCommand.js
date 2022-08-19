const { MessageCommand, Flag } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const fs = require('fs');
const { db } = require('../../models/db');
const { ADD_TO_QUEUE, FIND_SONG_IN_QUEUE, GET_RECENT, SEARCH_QUEUE } = require('../../models/musicQueries');
const config = require('../../../config.json');
const { isVoiceServer, regularRestriction } = require('../../utilities/permissions');

module.exports = class QueueMessageCommand extends MessageCommand {
  constructor() {
    super('queue', {
      aliases: ['queue', 'q', '🎵'],
      category: 'music',
      description: {
        content: 'Adds a song to the music queue.',
        usage: 'queue [song]',
        examples: ['queue Red'],
      },
      channel: 'guild',
    });
  }

  userPermissions(message) {
    if (isVoiceServer(message.guild.id)) return 'Server';
    if (!message.util.parsed.content) return null;
    return regularRestriction(message);
  }

  *args() {
    const method = yield {
      type: [['queueAlbum', 'album']],
    };

    if (method) return Flag.continue(method);

    const song = yield {
      type: 'song',
      match: 'content',
      unordered: true,
    };

    return { song };
  }

  async exec(message, { song }) {
    const queueEmbed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setURL('https://lhwb.dev/');

    const failEmbed = new EmbedBuilder().setColor(Colors.Red);

    const successEmbed = new EmbedBuilder().setColor('#FF69B4');

    function getSongs(array, songQueue) {
      for (let num = 0; num < array.length; num++) {songQueue = songQueue + `${num + 1}. ${array[num]['official_name']}\n`;}
      return songQueue;
    }

    function printQueue() {
      db.query(GET_RECENT, [message.guild?.id, 1], function(err, result) {
        const playingSong = result[0];
        db.query(SEARCH_QUEUE, [message.guild.id], function(err, result2) {
          let songQueue = '';
          if (result2.length > 0 && playingSong['queued_by'] !== null && playingSong['official_name'] === result2[0]['official_name']) {
            queueEmbed.setTitle(`Currently Playing: ${playingSong['official_name']} (Queued)`);
            result2.shift();
            songQueue = getSongs(result2, songQueue);

            if (songQueue.length < 1) {
              return message.channel.send({
                embeds: [
                  queueEmbed.setDescription('There\'s nothing else queued at the moment...'),
                ],
              });
            }
            else {
              return message.channel.send({
                embeds: [
                  queueEmbed.setDescription(`Queued for play:\n${songQueue}`),
                ],
              });
            }
          }
          else if (result2.length > 0) {
            songQueue = getSongs(result2, songQueue);

            return message.channel.send({
              embeds: [
                queueEmbed
                  .setTitle(`Currently Playing: ${playingSong['official_name']}`)
                  .setDescription(`Queued for play:\n${songQueue}`),
              ],
            });
          }
          else {
            return message.channel.send({
              embeds: [
                failEmbed.setDescription('There\'s nothing queued at the moment...'),
              ],
            });
          }
        },
        );
      },
      );
    }

    function addToQueue() {
      db.query(FIND_SONG_IN_QUEUE, [message.guild?.id, song['song_detail_id']], function(err, result) {
        if (result.length > 2) {
          return message.channel.send({
            embeds: [
              failEmbed.setDescription(`${song['official_name']} is already in the queue and was not added.`),
            ],
          });
        }
        fs.access(`${config.music.filepath}${song.path}`, fs.constants.F_OK, async (err) => {
          if (err) {
            return message.channel.send({
              embeds: [
                failEmbed.setDescription('I know this song but I couldn\'t find the file. :thinking:'),
              ],
            });
          }
          db.query(ADD_TO_QUEUE, [song['song_detail_id'], message.guild.id, message.author.tag]);
          return message.channel.send({
            embeds: [
              successEmbed.setDescription(`${song['official_name']} has been added to the queue.`),
            ],
          });
        },
        );
      });
    }

    if (JSON.stringify(song) === JSON.stringify(Flag.fail(''))) {
      return printQueue();
    }
    else if (song === null) {
      return message.channel.send({
        embeds: [
          failEmbed.setDescription('That song could not be found.\nPlease check the track listings (!tracks).\nIf it\'s not there ask iandrewc to add the song.'),
        ],
      });
    }
    else {
      return addToQueue();
    }
  }
};
