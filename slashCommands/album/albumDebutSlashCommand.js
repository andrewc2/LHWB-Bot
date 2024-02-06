const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, escapeNumberedList } = require('discord.js');

module.exports = class AlbumDebutSlashCommand extends SlashCommand {
  constructor() {
    super('debut', {
      name: 'album debut',
      prefixId: 'debut',
      category: 'albums',
      commandType: 'sub',
      parentCommand: 'album',
      shortName: 'debut',
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(568027)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Taylor_Swift_(album)',
      })
      .setThumbnail('https://i.imgur.com/w0bksSN.jpg')
      .setDescription(escapeNumberedList('**Taylor Swift** was released on __October 24, 2006__ \n\n1. Tim McGraw\n2. Picture to Burn\n3. Teardrops on My Guitar\n4. A Place in This World\n5. Cold as You\n6. The Outside\n7. Tied Together with a Smile\n8. Stay Beautiful\n9. Should\'ve Said No\n10. Mary\'s Song (Oh My My My)\n11. Our Song\n\n__Deluxe Version__\n12. I\'m Only Me When I\'m with You\n13. Invisible\n14. A Perfectly Good Heart'));

    return interaction.reply({ embeds: [embed] });
  }
};
