import { Command } from '@lhwb/framework';
import { Paginator } from '@lhwb/shared';
import {
  ApplicationCommandOptionType,
  EmbedBuilder,
  escapeNumberedList,
} from 'discord.js';

export default class TourErasSetList extends Command {
  constructor() {
    super('tourErasSetList', {
      name: 'tour eras setlist',
      category: 'tours',
      description: 'Displays the setlist for Taylor Swift The Eras Tour',
      options: [
        {
          name: 'version',
          description: 'Which version of tour?',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: 'Eras I (NA 2023/LATAM/AS/AU)',
              value: 'ogEra',
            },
            {
              name: 'Eras II (EU/NA 2024)',
              value: 'newEra',
            },
          ],
        },
      ],
    });
  }

  async exec(interaction) {
    const version = interaction.options.getString('version', true);

    const embedP1 = new EmbedBuilder()
      .setColor(0x586891)
      .setAuthor({
        name: 'Typical The Eras Tour Setlist',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=6bde5e4e',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TheErasTour.png')
      .setFooter({ text: 'Page 1 of 4' })
      .setDescription(
        escapeNumberedList(
          "Countdown\nIntro (contains elements from prior tours)\n\n**Lover Era**\n1. Miss Americana & the Heartbreak Prince (Shortened)\n2. Cruel Summer\n3. The Man\n4. You Need to Calm Down (Shortened)\n5. Lover\n6. The Archer\n\n**Fearless Era**\n7. Fearless (Electric version, shortened)\n8. You Belong With Me\n9. Love Story\n\n**evermore Era**\n10a. no body no crime (on shows with HAIM)\n10b.'tis the damn season (not included on shows with HAIM)\n11. willow\n12. marjorie (shortened)\n13. champagne problems (Spoken intro)\n14. tolerate it (Extended intro with keys, second verse skipped)",
        ),
      );

    const embedP2 = new EmbedBuilder()
      .setColor(0x586891)
      .setAuthor({
        name: 'Typical The Eras Tour Setlist',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=6bde5e4e',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TheErasTour.png')
      .setFooter({ text: 'Page 2 of 4' })
      .setDescription(
        escapeNumberedList(
          '**reputation Era**\n15. ...Ready for It? (Extended intro, skipped some lyrics)\n16. Delicate\n17. Don\'t Blame Me (Acoustic intro; extended outro)\n18. Look What You Made Me Do\n\n**Speak Now Era**\n19. Enchanted (Extended intro)\n20. Long Live (Extended outro Started KC N1)\n\n**Red Era**\nRed - Intro (Contains elements of "State of Grace", "Everything Has Changed / Holy Ground" and "Red")\n21. 22\n22. We Are Never Ever Getting Back Together\n23. I Knew You Were Trouble (Shortened)\n24a. Nothing New (on shows with Phoebe Bridgers)\n24b. All Too Well (10 Minute Version) (Spoken intro)',
        ),
      );

    const embedP3 = new EmbedBuilder()
      .setColor(0x586891)
      .setAuthor({
        name: 'Typical The Eras Tour Setlist',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=6bde5e4e',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TheErasTour.png')
      .setFooter({ text: 'Page 3 of 4' })
      .setDescription(
        escapeNumberedList(
          '**folklore Era**\nseven (Spoken word version)\n25a. invisible string (Glendale/Vegas/Nashville N2)\n25b. the one (Arlington on)\n26. betty (spoken intro)\n27. the last great american dynasty\n28. august\n29. illicit affairs (shortened)\n30. my tears ricochet\n31. cardigan (Extended outro)\n\n**1989 Era**\n32. Style (Shortened)\n33. Blank Space\n34. Shake It Off (Extended outro)\n35. Wildest Dreams (Shortened)\n36. Bad Blood (Shortened; extended outro)\n\n37 and 38. **Surprise Acoustic Songs**',
        ),
      );

    const embedP4 = new EmbedBuilder()
      .setColor(0x586891)
      .setAuthor({
        name: 'Typical The Eras Tour Setlist',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=6bde5e4e',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TheErasTour.png')
      .setFooter({ text: 'Page 4 of 4' })
      .setDescription(
        escapeNumberedList(
          '**Midnights Era**\n39. Lavender Haze (Extended intro)\n40. Anti‐Hero\n41. Midnight Rain\n42. Vigilante Shit\n43. Bejeweled\n44. Mastermind\n45. Karma (Extended outro)',
        ),
      );

    const embedArrayOld = [embedP1, embedP2, embedP3, embedP4];

    const embedNP1 = new EmbedBuilder()
      .setColor(0x586891)
      .setAuthor({
        name: 'Typical The Eras Tour Setlist',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=6bde5e4e',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TheErasTour.png')
      .setFooter({ text: 'Page 1 of 4' })
      .setDescription(
        escapeNumberedList(
          'Countdown\nIntro (contains elements from prior tours)\n\n**Lover Era**\n1. Miss Americana & the Heartbreak Prince (Shortened)\n2. Cruel Summer\n3. The Man\n4. You Need to Calm Down (Shortened)\n5. Lover\n\n**Fearless Era**\n6. Fearless (Electric version, shortened)\n7. You Belong With Me\n8. Love Story\n\n**Red Era**\nRed - Intro (Contains elements of "State of Grace", "Holy Ground" and "Red")\n9. 22\n10. We Are Never Ever Getting Back Together\n11. I Knew You Were Trouble (Shortened)\n12. All Too Well (10 Minute Version) (Spoken intro)',
        ),
      );

    const embedNP2 = new EmbedBuilder()
      .setColor(0x586891)
      .setAuthor({
        name: 'Typical The Eras Tour Setlist',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=6bde5e4e',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TheErasTour.png')
      .setFooter({ text: 'Page 2 of 4' })
      .setDescription(
        escapeNumberedList(
          "**Speak Now Era**\n13. Enchanted (Extended intro / Shortened)\n\n**reputation Era**\n14. ...Ready for It? (Extended intro, skipped some lyrics)\n15. Delicate\n16. Don't Blame Me (Acoustic intro; extended outro)\n17. Look What You Made Me Do\n\n**folkmore Era**\n18. cardigan (Extended Intro)\n19. betty (spoken intro)\n20. champagne problems (Spoken intro)\n21. august\n22. illicit affairs (shortened)\n23. my tears ricochet\n24. marjorie (shortened)\n25. willow",
        ),
      );

    const embedNP3 = new EmbedBuilder()
      .setColor(0x586891)
      .setAuthor({
        name: 'Typical The Eras Tour Setlist',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=6bde5e4e',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TheErasTour.png')
      .setFooter({ text: 'Page 3 of 4' })
      .setDescription(
        escapeNumberedList(
          "**1989 Era**\n26. Style (Shortened)\n27. Blank Space\n28. Shake It Off (Extended outro)\n29. Wildest Dreams (Shortened)\n30. Bad Blood (Shortened; extended outro)\n\n**THE TORTURED POETS DEPARTMENT Era**\n31. But Daddy I Love Him (shortened)\n32. So High School (bridge)\n33. Who's Afraid of Little Old Me?\n34. Down Bad (Shortened)\n35. Fortnight\n36. The Smallest Man Who Ever Lived (Shortened)\n37. I Can Do It With a Broken Heart (Stage Act)",
        ),
      );

    const embedNP4 = new EmbedBuilder()
      .setColor(0x586891)
      .setAuthor({
        name: 'Typical The Eras Tour Setlist',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=6bde5e4e',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TheErasTour.png')
      .setFooter({ text: 'Page 4 of 4' })
      .setDescription(
        escapeNumberedList(
          '38 and 39. **Surprise Acoustic Songs**\n\n**Midnights Era**\n40. Lavender Haze (Extended intro)\n41. Anti‐Hero\n42. Midnight Rain\n43. Vigilante Shit\n44. Bejeweled\n45. Mastermind\n46. Karma (Extended outro)',
        ),
      );

    const embedArrayNew = [embedNP1, embedNP2, embedNP3, embedNP4];

    if (version === 'ogEra') {
      const pagination = new Paginator(
        interaction,
        embedArrayOld,
        this.client.logger,
        true,
      );
      return await pagination.send();
    } else {
      const pagination = new Paginator(
        interaction,
        embedArrayNew,
        this.client.logger,
        true,
      );
      return await pagination.send();
    }
  }
}
