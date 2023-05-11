const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { pagination } = require('../../utilities/pagination');

module.exports = class AlbumFearlessMessageCommand extends SlashCommand {
  constructor() {
    super('fearless', {
      name: 'album fearless',
      prefixId: 'fearless',
      category: 'albums',
      commandType: 'sub',
      parentCommand: 'album',
      shortName: 'fearless',
    });
  }

  async exec(interaction, message) {
    await interaction.deferReply({ fetchReply: true });

    const embedTV = new EmbedBuilder()
      .setColor(14929032)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Fearless_(Taylor_Swift_album)',
      })
      .setThumbnail('https://i.imgur.com/2lDT0PV.jpg')
      .setFooter({ text: 'TV Page 1 of 3 - Overall Page 1 of 5' })
      .setDescription('**Fearless** was released on __November 11, 2008__,\n**Fearless (Taylor\'s Version)** was released __April 9, 2021__\n\n1. Fearless (Taylor’s Version)\n2. Fifteen (Taylor’s Version)\n3. Love Story (Taylor’s Version)\n4. Hey Stephen (Taylor’s Version)\n5. White Horse (Taylor’s Version)\n6. You Belong With Me (Taylor’s Version)\n7. Breathe (feat. Colbie Caillat) (Taylor’s Version)\n8. Tell Me Why (Taylor’s Version)\n9. You\'re Not Sorry (Taylor’s Version)');

    const embedTVp2 = new EmbedBuilder()
      .setColor(14929032)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Fearless_(Taylor_Swift_album)',
      })
      .setThumbnail('https://i.imgur.com/2lDT0PV.jpg')
      .setFooter({ text: 'TV Page 2 of 3 - Overall Page 2 of 5' })
      .setDescription('**Fearless** was released on __November 11, 2008__,\n**Fearless (Taylor\'s Version)** was released __April 9, 2021__\n\n\n10. The Way I Loved You (Taylor’s Version)\n11. Forever and Always (Taylor’s Version)\n12. The Best Day (Taylor’s Version)\n13. Change (Taylor’s Version)\n14. Jump Then Fall (Taylor’s Version)\n15. Untouchable (Taylor’s Version)\n16. Forever And Always (Piano / Taylor’s Version)\n17. Come in with the Rain (Taylor’s Version)\n18. Superstar (Taylor’s Version)\n19. The Other Side of the Door (Taylor’s Version)');

    const embedTVp3 = new EmbedBuilder()
      .setColor(14929032)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Fearless_(Taylor_Swift_album)',
      })
      .setThumbnail('https://i.imgur.com/2lDT0PV.jpg')
      .setFooter({ text: 'TV Page 3 of 3 - Overall Page 3 of 5' })
      .setDescription('**Fearless** was released on __November 11, 2008__,\n**Fearless (Taylor\'s Version)** was released __April 9, 2021__\n\n20. Today Was A Fairytale (Taylor\'s Version)\nIf This Was A Movie (Taylor\'s Version)\n21. You All Over Me (feat. Maren Morris) (From The Vault)\n22. Mr. Perfectly Fine (From The Vault)\n23. We Were Happy (From The Vault)\n24. That\'s When (feat. Keith Urban) (From The Vault)\n25. Don\'t You (From The Vault)\n26. Bye Bye Baby (From The Vault)\n27. Love Story (Taylor\'s Version) - Elvira Remix');

    const embedPlat = new EmbedBuilder()
      .setColor(14929032)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Fearless_(Taylor_Swift_album)',
      })
      .setThumbnail('https://i.imgur.com/TPL7mge.jpg')
      .setFooter({ text: 'Overall Page 4 of 5' })
      .setDescription('**Fearless Platinum Edition** was released on __October 26, 2009__ \n\n1. Jump Then Fall\n2. Untouchable\n3. Forever And Always (Piano Version)\n4. Come in with the Rain\n5. Superstar\n6. The Other Side of the Door\n7. Fearless\n8. Fifteen\n9. Love Story\n10. Hey Stephen\n11. White Horse\n12. You Belong with Me\n13. Breathe (featuring Colbie Caillat)\n14. Tell Me Why\n15. You\'re Not Sorry\n16. The Way I Loved You\n17. Forever and Always\n18. The Best Day\n19. Change');

    const embedOG = new EmbedBuilder()
      .setColor(14929032)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Fearless_(Taylor_Swift_album)',
      })
      .setThumbnail('https://i.imgur.com/TPL7mge.jpg')
      .setFooter({ text: 'Overall Page 5 of 5' })
      .setDescription('**Fearless** was released on __November 11, 2008__ \n\n1. Fearless\n2. Fifteen\n3. Love Story\n4. Hey Stephen\n5. White Horse\n6. You Belong with Me\n7. Breathe (featuring Colbie Caillat)\n8. Tell Me Why\n9. You\'re Not Sorry\n10. The Way I Loved You\n11. Forever and Always\n12. The Best Day\n13. Change');

    const embedArray = [embedTV, embedTVp2, embedTVp3, embedPlat, embedOG];
    return await pagination(message, embedArray, false);
  }
};
