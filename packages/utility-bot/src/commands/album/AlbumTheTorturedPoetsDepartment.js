import { Command } from '@lhwb/framework';
import { Paginator } from '@lhwb/shared';
import { EmbedBuilder, escapeNumberedList } from 'discord.js';

export default class AlbumTheTorturedPoetsDepartment extends Command {
  constructor() {
    super('theTorturedPoetsDepartment', {
      name: 'album the-tortured-poets-department',
      description:
        "Displays the track-list for Taylor Swift's album The Tortured Poets Department",
      category: 'albums',
    });
  }

  async exec(interaction) {
    const embed1 = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/The_Tortured_Poets_Department',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TTPD.png')
      .setFooter({ text: 'Page 1 of 4 - Main Album Total Runtime: 65:08' })
      .setDescription(
        escapeNumberedList(
          '**The Tortured Poets Department** was released on __April 19, 2024__\n\n1. Fortnight (feat Post Malone) (3:48)\n2. The Tortured Poets Department (4:53)\n3. My Boy Only Breaks His Favorite Toys (3:23)\n4. Down Bad (4:21)\n5. So Long, London (4:22)\n6. But Daddy I Love Him (5:40)\n7. Fresh Out the Slammer (3:30)\n8. Florida!!! (feat Florence + The Machine) (3:35)',
        ),
      );

    const embed2 = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/The_Tortured_Poets_Department',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TTPD.png')
      .setFooter({ text: 'Page 2 of 4' })
      .setDescription(
        escapeNumberedList(
          "**The Tortured Poets Department** was released on __April 19, 2024__\n\n9. Guilty as Sin? (4:14)\n10. Who's Afraid of Little Old Me? (5:34)\n11. I Can Fix Him (No Really I Can) (2:36)\n12. loml (4:37)\n13. I Can Do It With a Broken Heart (3:38)\n14. The Smallest Man Who Ever Lived (4:05)\n15. The Alchemy (3:16)\n16. Clara Bow (3:36)",
        ),
      );

    const embed3 = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/The_Tortured_Poets_Department',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TTPDTheAnthology.png')
      .setFooter({ text: 'Page 3 of 4 - The Anthology Total Runtime: 120:02' })
      .setDescription(
        escapeNumberedList(
          '**The Tortured Poets Department: The Anthology** was released on __April 19, 2024__\n\n17. The Black Dog (3:58)\n18. imgonnagetyouback (3:42)\n19. The Albatross (3:03)\n20. Chloe or Sam or Sophia or Marcus (3:33)\n21. How Did It End? (3:58)\n22. So High School (3:48)\n23. I Hate It Here (4:03)',
        ),
      );

    const embed4 = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/The_Tortured_Poets_Department',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TTPDTheAnthology.png')
      .setFooter({ text: 'Page 4 of 4' })
      .setDescription(
        escapeNumberedList(
          "**The Tortured Poets Department: The Anthology** was released on __April 19, 2024__\n\n24. thanK you aIMee (4:23)\n25. I Look in People's Windows (2:11)\n26. The Prophecy (4:09)\n27. Cassandra (4:00)\n28. Peter (4:43)\n29. The Bolter (3:58)\n30. Robin (4:00)\n31. The Manuscript (3:44)",
        ),
      );

    const embedArray = [embed1, embed2, embed3, embed4];
    const paginator = new Paginator(
      interaction,
      embedArray,
      this.client.logger,
      false,
    );
    return await paginator.send();
  }
}
