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
      .setDescription(escapeNumberedList('**The Tortured Poets Department** will be released on __April 19, 2024__\n\n1. Fortnight (feat Post Malone) (:)\n2. The Tortured Poets Department (:)\n3. My Boy Only Breaks His Favorite Toys (:)\n4. Down Bad (:)\n5. So Long, London (:)\n6. But Daddy I Love Him (:)\n7. Fresh Out the Slammer (:)\n8. Florida!!! (feat Florene + The Machine) (:)\n9. Guilt as Sin? (:)'));

    const embed2 = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/The_Tortured_Poets_Department',
      })
      .setThumbnail('https://i.imgur.com/piAIXwA.jpeg')
      .setFooter({ text: 'Page 2 of 2' })
      .setDescription(escapeNumberedList('**The Tortured Poets Department** will be released on __April 19, 2024__\n\n\n10. Who\'s Afraid of Little Old Me? (:)\n11. I Can Fix Him (No Really I Can) (3:24)\n12. loml (:)\n13. I Can Do It With a Broken Heart (:)\n14. The Smallest Man Who Ever Lived (:)\n15. The Alchemy (:)\n16. Clara Bow (:)\n17. The Manuscript (:)\n'));

    const embedArray = [embed1, embed2];

    return await pagination(message, embedArray, false);
  }
};