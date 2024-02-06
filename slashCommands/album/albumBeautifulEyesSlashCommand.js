const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, escapeNumberedList } = require('discord.js');

module.exports = class AlbumBeautifulEyesSlashCommand extends SlashCommand {
  constructor() {
    super('beautifulEyes', {
      name: 'album beautiful-eyes',
      prefixId: 'beautifulEyes',
      category: 'albums',
      commandType: 'sub',
      parentCommand: 'album',
      shortName: 'beautiful-eyes',
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0xe78234)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Beautiful_Eyes',
      })
      .setThumbnail('https://i.imgur.com/sN5DToG.jpg')
      .setDescription(escapeNumberedList('**Beautiful Eyes** was released on __July 15, 2008__ \n\n1. Beautiful Eyes\n2. Should\'ve Said No (Alternate version)\n3. Teardrops on My Guitar (Acoustic version)\n4. Picture to Burn (Radio edit)\n5. I\'m Only Me When I\'m with You\n6. I Heart ?\n\n__Disk Two (DVD)__\n1. Beautiful Eyes (music video)\n2. Picture to Burn (music video)\n3. I\'m Only Me When I\'m with You (music video)\n4. Tim McGraw (music video)\n5. Teardrops on My Guitar (Pop version music video)\n6. Our Song (music video)\n7. Making of \'Picture to Burn\' Video\n8. GAC New Artist Interview\n9. 2008 ACM Awards Performance of \'Should\'ve Said No'));

    return interaction.reply({ embeds: [embed] });
  }
};
