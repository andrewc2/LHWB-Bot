const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, escapeNumberedList } = require('discord.js');
const { pagination } = require('../../utilities/pagination');

module.exports = class AlbumRedSlashCommand extends SlashCommand {
  constructor() {
    super('red', {
      name: 'album red',
      prefixId: 'red',
      category: 'albums',
      commandType: 'sub',
      parentCommand: 'album',
      shortName: 'red',
    });
  }

  async exec(interaction, message) {
    await interaction.deferReply({ fetchReply: true });

    const embedTV = new EmbedBuilder()
      .setColor(11476553)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Red_(Taylor%27s_Version)',
      })
      .setThumbnail('https://i.imgur.com/gVbp7G0.png')
      .setFooter({ text: 'Page 1 of 3' })
      .setDescription(escapeNumberedList('**Red** was released on __October 22, 2012__,\n**Red (Taylor\'s Version)** was released __November 12, 2021__\n\n1. State of Grace (Taylor’s Version)\n2. Red (Taylor’s Version)\n3. Treacherous (Taylor’s Version)\n4. I Knew You Were Trouble. (Taylor’s Version)\n5. All Too Well (Taylor’s Version)\n6. 22 (Taylor’s Version)\n7. I Almost Do (Taylor’s Version)\n8. We Are Never Ever Getting Back Together (Taylor’s Version)\n9. Stay Stay Stay (Taylor’s Version)\n10. The Last Time (feat. Gary Lightbody) (Taylor’s Version)'));

    const embedTVp2 = new EmbedBuilder()
      .setColor(11476553)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Red_(Taylor%27s_Version)',
      })
      .setThumbnail('https://i.imgur.com/gVbp7G0.png')
      .setFooter({ text: 'Page 2 of 3' })
      .setDescription(escapeNumberedList('**Red** was released on __October 22, 2012__,\n**Red (Taylor\'s Version)** was released __November 12, 2021__\n\n11. Holy Ground (Taylor’s Version)\n12. Sad Beautiful Tragic (Taylor’s Version)\n13. The Lucky One (Taylor’s Version)\n14. Everything Has Changed (feat. Ed Sheeran) (Taylor’s Version)\n15. Starlight (Taylor’s Version)\n16. Begin Again (Taylor’s Version)\n17. The Moment I Knew (Taylor’s Version)\n18. Come Back... Be Here (Taylor’s Version)\n19. Girl At Home (Taylor’s Version)\n20. State Of Grace (Acoustic Version) (Taylor’s Version)'));

    const embedTVp3 = new EmbedBuilder()
      .setColor(11476553)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Red_(Taylor%27s_Version)',
      })
      .setThumbnail('https://i.imgur.com/gVbp7G0.png')
      .setFooter({ text: 'Page 3 of 3' })
      .setDescription(escapeNumberedList('**Red** was released on __October 22, 2012__,\n**Red (Taylor\'s Version)** was released __November 12, 2021__\n\n21. Ronan (Taylor’s Version)\n22. Better Man (From The Vault)\n23. Nothing New (feat. Phoebe Bridgers) (From The Vault)\n24. Babe (From The Vault)\n25. Message In A Bottle (From The Vault)\n26. I Bet You Think About Me (feat. Chris Stapleton) (From The Vault)\n27. Forever Winter (From The Vault)\n28. Run (feat. Ed Sheeran) (From The Vault)\n29. The Very First Night (From The Vault)\n30. All Too Well (10 Minute Version) (From The Vault)'));

    const embed = new EmbedBuilder()
      .setColor(11476553)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Red_(Taylor%27s_Version)',
      })
      .setThumbnail('http://i.imgur.com/as6dlgi.jpg')
      .setDescription(escapeNumberedList('**Red** was released on __October 22, 2012__ \n\n1. State of Grace\n2. Red\n3. Treacherous\n4. I Knew You Were Trouble.\n5. All Too Well\n6. 22\n7. I Almost Do\n8. We Are Never Ever Getting Back Together\n9. Stay Stay Stay\n10. The Last Time (feat. Gary Lightbody)\n11. Holy Ground\n12. Sad Beautiful Tragic\n13. The Lucky One\n14. Everything Has Changed (feat. Ed Sheeran)\n15. Starlight\n16. Begin Again\n\n__Deluxe Version__\n17. The Moment I Knew\n18. Come Back... Be Here\n19. Girl At Home'));

    const embedArray = [embedTV, embedTVp2, embedTVp3, embed];

    return await pagination(message, embedArray, false);
  }
};
