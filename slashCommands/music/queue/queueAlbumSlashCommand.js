const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, ApplicationCommandOptionType, Colors } = require('discord.js');
const { db } = require('../../../models/db');
const { GET_ALBUM, SEARCH_QUEUE, QUEUE_ALBUM } = require('../../../models/musicQueries');
const { isVoiceServerAndMod } = require('../../../utilities/permissions');
const { dequeue } = require('../../../utilities/music');
const fs = require('fs');
const config = require('../../../config.json');

module.exports = class QueueAlbumSlashCommand extends SlashCommand {
  constructor() {
    super('queueAlbum', {
      name: 'queue album',
      prefixId: 'queueAlbum',
      category: 'music',
      channel: 'guild',
      commandType: 'sub',
      parentCommand: 'queue',
      shortName: 'album',
      slashOptions: [
        {
          name: 'album',
          description: 'The name of the album to add to the queue',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
        },
      ],
    });
  }

  userPermissions(message) {
    return isVoiceServerAndMod(message);
  }

  async exec(interaction) {
    await interaction.deferReply();
    const album = interaction.options.getString('album').toString();
    const successEmbed = new EmbedBuilder().setColor(Colors.Green);
    const failedEmbed = new EmbedBuilder().setColor(Colors.Red);

    const [result] = await db.promise().query(GET_ALBUM, [album]);
    if (result.length === 0) {
      return interaction.editReply({
        embeds: [
          failedEmbed.setDescription('Sorry, I couldn\'t find this album. Please try again with a different album.'),
        ],
      });
    }

    db.query(SEARCH_QUEUE, [interaction.guild.id], function(err, result2) {
      if (result2.length === 0) return;
      result2.forEach((song) => {
        if (song['album'].toLowerCase() === album) {
          dequeue(song['song_detail_id'], interaction.guild.id);
        }
      });
    });

    const playableSongs = [];
    result.forEach((song) => {
      const exists = fs.existsSync(`${config.music.filepath}${song.path}`);
      if (exists) {
        playableSongs.push([song.id, interaction.guild.id, interaction.user.tag]);
      }
    });

    if (playableSongs.length > 0) {
      db.query(QUEUE_ALBUM, [playableSongs]);
      return interaction.editReply({
        embeds: [
          successEmbed.setDescription(`${result[0]['album']} has been queued.`),
        ],
      });
    }

    return interaction.editReply({
      embeds: [
        failedEmbed.setDescription(`Unable to queue ${result[0]['album']}.`),
      ],
    });
  }

  async autocomplete(interaction) {
    if (!interaction.guild) return interaction.respond([]);
    const input = interaction.options.getString('album', true).toLowerCase();
    const sql = input.length > 0
      ? 'SELECT DISTINCT `album` FROM `song_detail` WHERE `is_album` = ? AND `album` LIKE ? LIMIT 10'
      : 'SELECT DISTINCT `album` FROM `song_detail` WHERE `is_album` = ? ORDER BY `album` LIMIT 10';
    const values = input.length > 0 ? [1, `${input}%`] : [1];
    const [row] = await db.promise().query(sql, values);
    const result = row.map((x) => ({
      name: x.album,
      value: x.album,
    }));
    await interaction.respond(result);
  }
};
