const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Color } = require('discord.js');
const { commandUsage } = require('../../utilities/utilities');

module.exports = class AvatarMessageCommand extends MessageCommand {
  constructor() {
    super('lAvatar', {
      aliases: ['lavatar'],
      category: 'admin',
      ownerOnly: true,
      description: {
        content: 'Changes the bots avatar.',
        usage: 'lavatar [url]',
        examples: [
          'lavatar link',
        ],
      },
      args: [
        {
          id: 'url',
          type: 'string',
          match: 'content',
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
      ],
    });
  }

  exec(message, args) {
    const selena = 'https://i.imgur.com/7rYMWjO.png';
    const taylor = 'https://i.imgur.com/NggyZ5P.png';
    const test = 'https://i.imgur.com/16JHm36.png';

    const embed = new EmbedBuilder()
      .setColor(Color.Green);

    if (args.url === 'taylor') {
      this.client.user.setAvatar(taylor);
    }
    else if (args.url === 'selena') {
      this.client.user.setAvatar(selena);
    }
    else if (args.url === 'test') {
      this.client.user.setAvatar(test);
    }
    else {
      this.client.user.setAvatar(args.url);
    }
    return message.channel.send({ embeds: [embed.setDescription('The avatar has been updated')] });
  }
};
