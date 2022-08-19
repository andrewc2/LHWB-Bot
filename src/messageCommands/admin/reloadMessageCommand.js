const { MessageCommand, Argument } = require('discord-akairo');
const { commandUsage } = require('../../utilities/utilities');
const { EmbedBuilder, Colors } = require('discord.js');

module.exports = class ReloadMessageCommand extends MessageCommand {
  constructor() {
    super('reload', {
      aliases: ['reload'],
      category: 'admin',
      ownerOnly: true,
      description: {
        content: 'Reloads a command.',
        usage: 'reload [command]',
        examples: [
          'reload queue',
        ],
      },
      args: [
        {
          id: 'command',
          type: Argument.union('commandAlias', 'listener'),
          match: 'content',
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
      ],
    });
  }

  exec(message, args) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Green);

    args.command.reload();
    return message.channel.send({ embeds: [embed.setDescription(`The \`${args.command.aliases[0]}\` command has been reloaded. :relaxed:`)] },
    );
  }
};
