const { MessageCommand, Flag } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');

module.exports = class LpingMessageCommand extends MessageCommand {
  constructor() {
    super('lping', {
      aliases: ['lping'],
      category: 'ping',
      channel: 'guild',
      description: {
        content: 'Returns the current general pinglists you are a part of, or pings a pinglist.',
        usage: 'lping / lping [listname] [message]',
        examples: [
          'lping', 'lping list', 'lping chase link', 'lping get chase', 'lping drop chase', 'lping create chase', 'lping delete chase',
        ],
      },
    });
  }

  *args() {
    const method = yield {
      type: [
        ['lpingGet', 'get'],
        ['lpingDrop', 'drop'],
        ['lpingList', 'list'],
        ['lpingCreate', 'create'],
        ['lpingDelete', 'delete'],
        ['lpingShow', 'show'],
      ],
    };

    if (method) return Flag.continue(method);
  }

  async exec(message) {
    const depreciatedEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription('Sorry the prefix command for this has been disabled.\nPlease use the enhanced slash command version: `/lping ping pinglist:[name]`');

    return message.channel.send({ embeds: [depreciatedEmbed] });
  }
};
