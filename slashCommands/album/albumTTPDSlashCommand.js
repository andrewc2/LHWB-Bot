const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, escapeNumberedList } = require('discord.js');
const { pagination } = require('../../utilities/pagination');

module.exports = class AlbumMidnightsSlashCommand extends SlashCommand {
  constructor() {
    super('ttpd', {
      name: 'album the-tortured-poets-department',
      prefixId: 'ttpd',
      category: 'albums',
      commandType: 'sub',
      parentCommand: 'album',
      shortName: 'ttpd',
    });
  }

  async exec(interaction, message) {
    await interaction.deferReply({ fetchReply: true });

    const embed1 = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/The_Tortured_Poets_Department',
      })
      .setThumbnail('https://i.imgur.com/piAIXwA.jpeg')
      .setFooter({ text: 'Page 1 of 2 - Main Album Total Runtime: tbd' })
      .setDescription(escapeNumberedList('**The Tortured Poets Department** will be released on __April 19, 2024__\n\n1. tbd (:)\n2. tbd (:)\n3. tbd (:)\n4. tbd (:)\n5. tbd (:)\n6. tbd (:)\n7. tbd (:)\n8. tbd (:)\n9. tbd (:)'));

    const embed2 = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/The_Tortured_Poets_Department',
      })
      .setThumbnail('https://i.imgur.com/piAIXwA.jpeg')
      .setFooter({ text: 'Page 2 of 2' })
      .setDescription(escapeNumberedList('**The Tortured Poets Department** will be released on __April 19, 2024__\n\n\n10. tbd (:)\n11. Karma (3:24)\n12. tbd (:)\n13. tbd (:)\n14. tbd (:)\n15. tbd (:)\n16. tbd (:)\n17. The Manuscript (:)\n'));

    const embedArray = [embed1, embed2];

    return await pagination(message, embedArray, false);
  }
};