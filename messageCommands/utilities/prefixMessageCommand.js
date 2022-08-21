const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = class PrefixMessageCommand extends MessageCommand {
  constructor() {
    super('prefix', {
      aliases: ['prefix'],
      category: 'bot',
      channel: 'guild',
      description: {
        content: 'Shows the command prefix.',
        usage: 'prefix [prefix/default]',
        examples: [
          'prefix',
        ],
      },
    });
  }

  exec(message) {
    const embed = new EmbedBuilder()
      .setColor(message.member.displayHexColor);

    return message.channel.send({ embeds: [embed.setDescription(`The command prefix is \`${config.discord.prefix}\`. To run commands, do \`${config.discord.prefix}<command>\``)] });
  }
};
