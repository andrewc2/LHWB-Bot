const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { commandUsage } = require('../../utilities/utilities');

module.exports = class PlayCountMessageCommand extends MessageCommand {
  constructor() {
    super('playCount', {
      aliases: ['playcount', 'pc'],
      category: 'music',
      description: {
        content: 'Shows play count for a track.',
        usage: 'playcount [song]',
        examples: [
          'playcount evermore',
        ],
      },
      args: [
        {
          id: 'song',
          type: 'song',
          match: 'content',
          otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
        },
      ],
    });
  }

  async exec(message, args) {
    const embed = new EmbedBuilder()
      .setTitle('Track Play Count')
      .setThumbnail(args.song.album_art_url.toString())
      .addFields([
        { name: 'Name', value: args.song.official_name.toString(), inline: true },
        { name: 'Play Count', value: args.song.play_count.toString(), inline: true },
      ])
      .setColor(Colors.Purple);

    return message.channel.send({ embeds: [embed] });
  }
};
