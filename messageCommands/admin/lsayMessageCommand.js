const { MessageCommand } = require('discord-akairo');
const { commandUsage } = require('../../utilities/utilities');

module.exports = class LsayMessageCommand extends MessageCommand {
  constructor() {
    super('lsay', {
      aliases: ['lsay'],
      category: 'admin',
      ownerOnly: true,
      description: {
        content: 'Speak as the bot',
        usage: 'lsay [channel] [text]',
        examples: [
          'lsay 123456789123456789 LosingHimWasBlue is the best',
        ],
      },
      args: [
        {
          id: 'channel',
          type: 'string',
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
        {
          id: 'text',
          type: 'string',
          match: 'rest',
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
      ],
    });
  }

  exec(message, args) {
    this.client.channels.cache.get(args.channel).send(args.text);
  }
};
