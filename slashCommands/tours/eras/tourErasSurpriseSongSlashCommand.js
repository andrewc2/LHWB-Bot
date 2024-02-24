const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { db } = require('../../../models/db');
const { pagination } = require('../../../utilities/pagination');

module.exports = class ErasTourSurpriseSongSlashCommand extends SlashCommand {
  constructor() {
    super('erasTourSurpriseSong', {
      name: 'tour eras surprise-songs',
      prefixId: 'ErasSurpriseSong',
      category: 'tours',
      commandType: 'sub',
      parentCommand: 'eras',
      shortName: 'surprise-songs',
    });
  }

  async exec(interaction, message) {
    await interaction.deferReply({ fetchReply: true });

    const allSurpriseSongs = [], embeds = [];
    const [rows] = await db.promise().query('SELECT * FROM `tour` ORDER BY `id` DESC');

    for (const event of rows.values()) {
      allSurpriseSongs.push(`- ${event.erasSetlist}\n`);
    }

    const perChunk = 6;
    const result = allSurpriseSongs.reduce((all, one, i) => {
      const ch = Math.floor(i / perChunk);
      all[ch] = [].concat((all[ch] || []), one);
      return all;
    }, []);

    result.forEach((event, i) => {
      embeds.push(new EmbedBuilder()
        .setAuthor({
          name: 'The Eras Tour: Surprise Songs',
          iconURL:'https://lhwb.dev/ts.png',
          url: 'https://docs.google.com/spreadsheets/d/1isbSEIwagJrX97rdZhdYsPBQ4Agw09VIdYj8SqkEjxA/edit#gid=1760751628',
        })
        .setThumbnail('https://i.imgur.com/v0Vl7WK.png')
        .setDescription(event.join(''))
        .setFooter({ text: `Page ${i + 1} of ${result.length} - (a/g) guitar (p) piano (m) "messed up" (r/yy) repeat/year of repeat` })
        .setColor(0x586891),
      );
    });

    return await pagination(message, embeds, false);
  }
};
