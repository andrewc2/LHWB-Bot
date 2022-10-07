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
      .setDescription('**Midnights** will be released on __October 21, 2022__ \n\n1. Lavender Haze\n2. Maroon\n3. Anti-Hero\n4. Snow On The Beach Feat. Lana Del Rey\n5. You\'re On Your Own, Kid\n6. Midnight Rain\n7. Question...?\n8. Vigilante Shit\n9. Bejeweled\n10. Labyrinth\n11. Karma\n12. Sweet Nothing\n13. Mastermind\n\n__Deluxe Version__\n14. Bonus Track One\n15. Bonus Track Two (Remix)\n16. Bonus Track Three (Remix)');

    return interaction.reply({ embeds: [embed] });
  }
};