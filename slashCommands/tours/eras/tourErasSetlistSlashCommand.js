const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, escapeNumberedList } = require('discord.js');
const { pagination } = require('../../../utilities/pagination');

module.exports = class ErasTourSetListSlashCommand extends SlashCommand {
  constructor() {
    super('erasTourSetList', {
      name: 'tour eras setlist',
      prefixId: 'ErasSetList',
      category: 'tours',
      commandType: 'sub',
      parentCommand: 'eras',
      shortName: 'setlist',
    });
  }

  async exec(interaction, message) {
    await interaction.deferReply({ fetchReply: true });

    const embedP1 = new EmbedBuilder()
      .setColor(0x586891)
      .setAuthor({
        name: 'Typical The Eras Tour Setlist',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=6bde5e4e',
      })
      .setThumbnail('https://i.imgur.com/v0Vl7WK.png')
      .setFooter({ text: 'Page 1 of 4' })
      .setDescription(escapeNumberedList('Countdown\nIntro (contains elements from prior tours)\n\n**Lover Era**\n1. Miss Americana & the Heartbreak Prince (Shortened)\n2. Cruel Summer\n3. The Man\n4. You Need to Calm Down (Shortened)\n5. Lover\n6. The Archer\n\n**Fearless Era**\n7. Fearless (Electric version, shortened)\n8. You Belong With Me\n9. Love Story\n\n**evermore Era**\n10a. no body no crime (on shows with HAIM)\n10b.\'tis the damn season (not included on shows with HAIM)\n11. willow\n12. marjorie (shortened)\n13. champagne problems (Spoken intro)\n14. tolerate it (Extended intro with keys, second verse skipped)'));

    const embedP2 = new EmbedBuilder()
      .setColor(0x586891)
      .setAuthor({
        name: 'Typical The Eras Tour Setlist',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=6bde5e4e',
      })
      .setThumbnail('https://i.imgur.com/v0Vl7WK.png')
      .setFooter({ text: 'Page 2 of 4' })
      .setDescription(escapeNumberedList('**reputation Era**\n15. ...Ready for It? (Extended intro, skipped some lyrics)\n16. Delicate\n17. Don\'t Blame Me (Acoustic intro; extended outro)\n18. Look What You Made Me Do\n\n**Speak Now Era**\n19. Enchanted (Extended intro)\n20. Long Live (Extended outro Started KC N1)\n\n**Red Era**\nRed - Intro (Contains elements of "State of Grace", "Everything Has Changed / Holy Ground" and "Red")\n21. 22\n22. We Are Never Ever Getting Back Together\n23. I Knew You Were Trouble (Shortened)\n24a. Nothing New (on shows with Phoebe Bridgers)\n24b. All Too Well (10 Minute Version) (Spoken intro)'));

    const embedP3 = new EmbedBuilder()
      .setColor(0x586891)
      .setAuthor({
        name: 'Typical The Eras Tour Setlist',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=6bde5e4e',
      })
      .setThumbnail('https://i.imgur.com/v0Vl7WK.png')
      .setFooter({ text: 'Page 3 of 4' })
      .setDescription(escapeNumberedList('**folklore Era**\nseven (Spoken word version)\n25a. invisible string (Glendale/Vegas/Nashville N2)\n25b. the one (Arlington on)\n26. betty (spoken intro)\n27. the last great american dynasty\n28. august\n29. illicit affairs (shortened)\n30. my tears ricochet\n31. cardigan (Extended outro)\n\n**1989 Era**\n32. Style (Shortened)\n33. Blank Space\n34. Shake It Off (Extended outro)\n35. Wildest Dreams (Shortened)\n36. Bad Blood (Shortened; extended outro)\n\n37 and 38. **Surprise Acoustic Songs**'));

    const embedP4 = new EmbedBuilder()
      .setColor(0x586891)
      .setAuthor({
        name: 'Typical The Eras Tour Setlist',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=6bde5e4e',
      })
      .setThumbnail('https://i.imgur.com/v0Vl7WK.png')
      .setFooter({ text: 'Page 4 of 4' })
      .setDescription(escapeNumberedList('**Midnights Era**\n39. Lavender Haze (Extended intro)\n40. Anti‐Hero\n41. Midnight Rain\n42. Vigilante Shit\n43. Bejeweled\n44. Mastermind\n45. Karma (Extended outro)'));

    const embedArray = [embedP1, embedP2, embedP3, embedP4];
    return await pagination(message, embedArray, true);

  }
};
