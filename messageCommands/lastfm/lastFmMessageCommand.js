const { MessageCommand, Flag } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { anyUsage } = require('../../utilities/utilities');
const { searchLastFm, findLastFmUser } = require('../../commandUtilities/lastFmUtilities');

module.exports = class LastFmMessageCommand extends MessageCommand {
  constructor() {
    super('lastFm', {
      aliases: ['lfm'],
      category: 'fm',
      description: {
        content: 'Returns yours or another users last scrobbled song.',
        usage: 'lfm <user>',
        examples: [
          'lfm iAndrewC',
        ],
      },
    });
  }

  *args() {
    const user = yield {
      type: 'relevant',
      default: message => message.author,
      unordered: true,
    };

    const method = yield {
      type: [
        ['lastFmSearch', 'search'],
        ['lastFmSet', 'set'],
        ['lastFmClear', 'clear'],
      ],
    };

    if (method) return Flag.continue(method);
    return { user };
  }

  async exec(message, args) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`Uh oh! Looks like you or that user has not saved your/their last.fm username.\nYou/They can set it by typing ${anyUsage(message.guild, message.client, 'lfm set <username>')}.`);

    const lastFmUsername = await findLastFmUser(args.user);
    if (!lastFmUsername) {
      return message.channel.send({
        embeds: [ embed ],
      });
    }
    return message.channel.send(await searchLastFm(lastFmUsername, args.user));
  }
};
