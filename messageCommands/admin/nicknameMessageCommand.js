const { MessageCommand } = require('discord-akairo');
const { commandUsage } = require('../../utilities/utilities');
const { EmbedBuilder, Colors } = require('discord.js');

module.exports = class NicknameMessageCommand extends MessageCommand {
  constructor() {
    super('nickname', {
      aliases: ['nickname', 'nick'],
      category: 'admin',
      ownerOnly: true,
      channel: 'guild',
      description: {
        content: 'Changes the bots nickname.',
        usage: 'nickname [command]',
        examples: [
          'nickname LosingHimWasBlue',
        ],
      },
      args: [
        {
          id: 'username',
          type: 'string',
          match: 'content',
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
      ],
    });
  }

  exec(message, args) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Green);

    void message.channel.guild.members.me.setNickname(args.username);
    return message.channel.send({ embeds: [embed.setDescription(`The nickname has been updated to: \`${args.username}\``) ] });
  }
};
