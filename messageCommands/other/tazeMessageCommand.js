const { MessageCommand } = require('discord-akairo');

module.exports = class TazeMessageCommand extends MessageCommand {
  constructor() {
    super('taze', {
      aliases: ['taze'],
      category: 'other',
      description: {
        content: 'Sends a :cloud_lightning: to chat.',
        usage: 'taze',
        examples: [
          'taze',
        ],
      },
    });
  }

  exec(message) {
    message.channel.send(':cloud_lightning:');
  }
};
