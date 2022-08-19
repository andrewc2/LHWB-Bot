const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { db } = require('../../models/db');
const { commandUsage } = require('../../utilities/utilities');

module.exports = class RequestMessageCommand extends MessageCommand {
  constructor() {
    super('request', {
      aliases: ['request'],
      category: 'other',
      description: {
        content: 'Request something be added to the bot',
        usage: 'request [song/gif/feature]',
        examples: [
          'request more lorde songs',
        ],
      },
      args: [
        {
          id: 'request',
          type: 'string',
          match: 'content',
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
      ],
    });
  }

  exec(message, args) {
    db.query('INSERT INTO requested (user, request) VALUES (?,?)', [message.author.tag, args.request]);
    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setDescription('Request Submitted!');
    return message.channel.send({ embeds: [embed] });
  }
};
