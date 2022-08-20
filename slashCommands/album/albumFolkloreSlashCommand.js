const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');

module.exports = class AlbumFolkloreSlashCommand extends SlashCommand {
  constructor() {
    super('folklore', {
      name: 'album folklore',
      prefixId: 'folklore',
      category: 'albums',
      commandType: 'sub',
      parentCommand: 'album',
      shortName: 'folklore',
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(12040119)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Folklore_(Taylor_Swift_album)',
      })
      .setThumbnail('https://i.imgur.com/oZvDEky.jpg')
      .setDescription('**folklore** was released on __July 24, 2020__ \n\n1. the 1\n2. cardigan\n3. the last great american dynasty\n4. exile (featuring Bon Iver)\n5. my tears ricochet\n6. mirrorball\n7. seven\n8. august\n9. this is me trying\n10. illicit affairs\n11. invisible string\n12. mad woman\n13. epiphany\n14. betty\n15. peace\n16. hoax\n\nDeluxe\n17. the lakes');

    return interaction.reply({ embeds: [embed] });
  }
};
