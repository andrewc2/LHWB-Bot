const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
// const config = require("../../config.json");

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
      .setDescription('TBD')
      .setColor(message.member.displayHexColor);

    return message.channel.send({ embeds: [ embed ] });
    // const prefix = this.client.settings.get(message.guild.id, "prefix", config.discord.prefix);
    // return message.channel.send({ embeds: [embed.setDescription(`The command prefix is \`${prefix || "none set"}\`. To run commands, use \`${prefix}command\`.`)] });
  }
};
