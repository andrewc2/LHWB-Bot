const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { db } = require('../../models/db');
const {
  FIND_SONG_IN_QUEUE,
} = require('../../models/musicQueries');
const { dequeue } = require('../../utilities/music');
const { cmdRestrictionsNoVC } = require('../../utilities/permissions');
const { commandUsage } = require('../../utilities/utilities');

module.exports = class DequeueMessageCommand extends MessageCommand {
  constructor() {
    super('dequeue', {
      aliases: ['dequeue', 'dq'],
      category: 'music',
      description: {
        content: 'Removes a song from the music queue.',
        usage: 'dequeue [song]',
        examples: ['dequeue Red'],
      },
      channel: 'guild',
      args: [
        {
          id: 'song',
          type: 'song',
          match: 'content',
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),

        },
      ],
    });
  }

  async userPermissions(message) {
    return await cmdRestrictionsNoVC(message);
  }

  async exec(message, { song }) {
    const failEmbed = new EmbedBuilder().setColor(Colors.Red);
    const successEmbed = new EmbedBuilder().setColor(Colors.Green);

    db.query(FIND_SONG_IN_QUEUE, [message.guild?.id, song['song_detail_id']], function(err, result) {
      if (result.length > 0) {
        dequeue(song['song_detail_id'], message.guild.id);
        return message.channel.send({
          embeds: [
            successEmbed.setDescription(`${song['official_name']} has been removed from the queue.`),
          ],
        });
      }
      else {
        return message.channel.send({
          embeds: [
            failEmbed.setDescription('This song isn\'t in the queue at the moment.'),
          ],
        });
      }
    });
  }
};
