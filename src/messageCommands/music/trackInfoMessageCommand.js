const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
// const { commandUsage } = require("../../utilities/utilities");

module.exports = class TrackInfoMessageCommand extends MessageCommand {
  constructor() {
    super('trackInfo', {
      aliases: ['trackinfo', 'tinfo'],
      category: 'music',
      description: {
        content: 'Shows information about a track.',
        usage: 'trackinfo [song]',
        examples: [
          'trackinfo evermore',
        ],
      },
      args: [
        {
          id: 'song',
          type: 'song',
          match: 'content',
          otherwise: 'tbd',
        },
      ],
    });
  }

  async exec(message, args) {
    const embed = new EmbedBuilder()
      .setTitle('Track Information')
      .setThumbnail(args.song.album_art_url.toString())
      .addFields([
        { name: 'Name', value: args.song.official_name.toString(), inline: true },
        { name: 'Album', value: args.song.album.toString(), inline: true },
        { name: 'Artist', value: args.song.artist_name.toString(), inline: true },
        { name: 'Track Number', value: args.song.track_number.toString(), inline: true },
        { name: 'Play Count', value: args.song.play_count.toString(), inline: true },
      ])
      .setColor(Colors.Green);

    return message.channel.send({ embeds: [embed] });
  }
};

