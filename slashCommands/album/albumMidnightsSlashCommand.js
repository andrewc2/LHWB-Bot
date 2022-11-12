const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');

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

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Midnights',
      })
      .setThumbnail('https://i.imgur.com/8swRZ5l.png')
      .setFooter({ text: 'Main Album Total Runtime: 44:02 | Deluxe Edition: 54:42 | 3am Edition: 69:29' })
      .setDescription('**Midnights** was released on __October 21, 2022__\n\n1. Lavender Haze (3:22)\n2. Maroon (3:38)\n3. Anti-Hero (3:20)\n4. Snow On The Beach Feat. Lana Del Rey (4:16)\n5. You\'re On Your Own, Kid (3:14)\n6. Midnight Rain (2:54)\n7. Question...? (3:30)\n8. Vigilante Shit (2:44)\n9. Bejeweled (3:14)\n10. Labyrinth (4:07)\n11. Karma (3:24)\n12. Sweet Nothing (3:08)\n13. Mastermind (3:11)\n\n__3AM Edition__\n14. The Great War (4:00)\n15. Bigger Than The Whole Sky (3:38)\n16. Paris (3:16)\n17. High Infidelity (3:51)\n18. Glitch (2:28)\n19. Would\'ve, Could\'ve, Should\'ve (4:20)\n20. Dear Reader (3:45)\n\n__Deluxe Version__\n14. Hits Different (3:54)\n15. You\'re On Your Own Kid (Strings Remix) (3:19)\n16. Sweet Nothing (Piano Remix) (3:27)');

    return interaction.reply({ embeds: [embed] });
  }
};