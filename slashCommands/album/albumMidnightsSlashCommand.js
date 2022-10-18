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
      .setFooter({ text: 'Total Runtime: 44:02' })
      .setDescription('**Midnights** will be released on __October 21, 2022__\n\n1. Lavender Haze (3:22)\n2. Maroon (3:38)\n3. Anti-Hero (3:20)\n4. Snow On The Beach Feat. Lana Del Rey (4:16)\n5. You\'re On Your Own, Kid (3:14)\n6. Midnight Rain (2:54)\n7. Question...? (3:30)\n8. Vigilante Shit (2:44)\n9. Bejeweled (3:14)\n10. Labyrinth (4:07)\n11. Karma (3:24)\n12. Sweet Nothing (3:08)\n13. Mastermind (3:11)\n\n__Deluxe Version__\n14. Hits Different\n15. You\'re On Your Own Kid (Strings Remix)\n16. Sweet Nothing (Piano Remix)');

    return interaction.reply({ embeds: [embed] });
  }
};