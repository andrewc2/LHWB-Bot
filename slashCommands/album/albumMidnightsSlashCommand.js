const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { pagination } = require('../../utilities/pagination');

module.exports = class AlbumMidnightsSlashCommand extends SlashCommand {
  constructor() {
    super('midnights', {
      name: 'album midnights',
      prefixId: 'midnights',
      category: 'albums',
      commandType: 'sub',
      parentCommand: 'album',
      shortName: 'midnights',
    });
  }

  async exec(interaction, message) {
    await interaction.deferReply({ fetchReply: true });

    const embed1 = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Midnights',
      })
      .setThumbnail('https://i.imgur.com/8swRZ5l.png')
      .setFooter({ text: 'Page 1 of 3 - Main Album Total Runtime: 44:02' })
      .setDescription('**Midnights** was released on __October 21, 2022__\n\n1. Lavender Haze (3:22)\n2. Maroon (3:38)\n3. Anti-Hero (3:20)\n4. Snow On The Beach Feat. Lana Del Rey (4:16)\n5. You\'re On Your Own, Kid (3:14)\n6. Midnight Rain (2:54)\n7. Question...? (3:30)\n8. Vigilante Shit (2:44)\n9. Bejeweled (3:14)\n10. Labyrinth (4:07)\n11. Karma (3:24)\n12. Sweet Nothing (3:08)\n13. Mastermind (3:11)');

    const embed2 = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Midnights',
      })
      .setThumbnail('https://i.imgur.com/8swRZ5l.png')
      .setFooter({ text: 'Page 2 of 3 - Deluxe Edition: 54:42 | 3am Edition: 69:29' })
      .setDescription('**Midnights** was released on __October 21, 2022__\n\n__3AM Edition__\n14. The Great War (4:00)\n15. Bigger Than The Whole Sky (3:38)\n16. Paris (3:16)\n17. High Infidelity (3:51)\n18. Glitch (2:28)\n19. Would\'ve, Could\'ve, Should\'ve (4:20)\n20. Dear Reader (3:45)\n\n__Deluxe Version__\n14. Hits Different (3:54)\n15. You\'re On Your Own Kid (Strings Remix) (3:19)\n16. Sweet Nothing (Piano Remix) (3:27)');

    const embed3 = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Midnights',
      })
      .setThumbnail('https://i.imgur.com/8swRZ5l.png')
      .setFooter({ text: 'Page 3 of 3' })
      .setDescription('**Midnights** was released on __October 21, 2022__\n\n__Til Dawn Tracks__\n21. Hits Different (3:54)\n22. Snow On The Beach Feat. More Lana Del Rey (3:49)\n23. Karma Feat. Ice Spice (3:21)\n\n__The Late Night Tracks__\n14. The Great War (4:00)\n15. Bigger Than The Whole Sky (3:38)\n16. High Infidelity (3:51)\n17. Would\'ve, Could\'ve, Should\'ve (4:20)\n18. Dear Reader (3:45)\n19. You\'re Losing Me (From The Vault)\n20. Snow On The Beach Feat. More Lana Del Rey (3:49)\n21. Karma Feat. Ice Spice (3:21)');

    const embedArray = [embed1, embed2, embed3];

    return await pagination(message, embedArray, false);
  }
};