const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, escapeNumberedList } = require('discord.js');
const { pagination } = require('../../utilities/pagination');

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

  async exec(interaction, message) {
    await interaction.deferReply({ fetchReply: true });

    const embed1 = new EmbedBuilder()
      .setColor(0xe78234)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Beautiful_Eyes',
      })
      .setThumbnail('https://i.imgur.com/sN5DToG.jpg')
      .setFooter({ text: 'Page 1 of 2 - Main Album Total Runtime: 18:06' })
      .setDescription(escapeNumberedList('**Beautiful Eyes** was released on __July 15, 2008__ \n\n1. Beautiful Eyes (2:58)\n2. Should\'ve Said No (Alternate version) (3:46)\n3. Teardrops on My Guitar (Acoustic version) (2:58)\n4. Picture to Burn (Radio edit) (2:54)\n5. I\'m Only Me When I\'m with You (3:35)\n6. I Heart ? (3:15)'));

    const embed2 = new EmbedBuilder()
      .setColor(0xe78234)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Beautiful_Eyes',
      })
      .setThumbnail('https://i.imgur.com/sN5DToG.jpg')
      .setFooter({ text: 'Page 2 of 2 - DVD Total Runtime: 60:46' })
      .setDescription(escapeNumberedList('**Beautiful Eyes** was released on __July 15, 2008__ \n\n__Disk Two (DVD)__\n1. Beautiful Eyes (music video) (2:56)\n2. Picture to Burn (music video) (3:36)\n3. I\'m Only Me When I\'m with You (music video) (3:47)\n4. Tim McGraw (music video) (4:00)\n5. Teardrops on My Guitar (Pop version music video) (3:26)\n6. Our Song (music video) (3:30)\n7. Making of Picture to Burn Video (22:02)\n8. GAC New Artist Interview (14:45)\n9. 2008 ACM Awards Performance of Should\'ve Said No (4:04)'));

    const embedArray = [embed1, embed2];

    return await pagination(message, embedArray, false);
  }
};
