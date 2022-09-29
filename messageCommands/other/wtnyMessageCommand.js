const { MessageCommand } = require('discord-akairo');

module.exports = class WtnyMessageCommand extends MessageCommand {
  constructor() {
    super('wtny', {
      aliases: ['wtny'],
      category: 'other',
      cooldown: 30000,
      ratelimit: 1,
      description: {
        content: 'Welcomes new users to the server.',
        usage: 'wtny',
        examples: [
          'wtny',
        ],
      },
    });
  }

  exec(message) {
    return message.channel.send({ files: ['https://lhwb.dev/rTSWTNY.gif'] });
  }
};
