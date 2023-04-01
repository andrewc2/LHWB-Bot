const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { db } = require('../../../models/db');
const { pagination } = require('../../../utilities/pagination');

module.exports = class ErasTourSecretSongSlashCommand extends SlashCommand {
  constructor() {
    super('erasTourSecretSong', {
      name: 'tour eras secret-songs',
      prefixId: 'ErasSecretSong',
      category: 'tours',
      commandType: 'sub',
      parentCommand: 'eras',
      shortName: 'secret-songs',
    });
  }

  async exec(interaction, message) {
    await interaction.deferReply({ fetchReply: true });

    const allSecretSongs = [], embeds = [];
    const [rows] = await db.promise().query('SELECT * FROM `tour`');

    for (const event of rows.values()) {
      allSecretSongs.push(`${event.erasSetlist}\n`);
    }

    const perChunk = 10;
    const result = allSecretSongs.reduce((all, one, i) => {
      const ch = Math.floor(i / perChunk);
      all[ch] = [].concat((all[ch] || []), one);
      return all;
    }, []);

    result.forEach((event, i) => {
      embeds.push(new EmbedBuilder()
        .setAuthor({
          name: 'The Eras Tour: Secret Songs',
          iconURL:'https://lhwb.dev/ts.png',
          url: 'https://docs.google.com/spreadsheets/d/1isbSEIwagJrX97rdZhdYsPBQ4Agw09VIdYj8SqkEjxA/edit#gid=1760751628',
        })
        .setThumbnail('https://i.imgur.com/v0Vl7WK.png')
        .setDescription(event.join(''))
        .setFooter({ text: `Page ${i + 1}/${result.length}` })
        .setColor(0x586891),
      );
    });

    return await pagination(message, embeds, false);
  }
};
