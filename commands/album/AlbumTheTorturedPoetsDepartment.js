import Command from '../../structure/commands/Command.js';
import { EmbedBuilder, escapeNumberedList } from 'discord.js';
import Paginator from '../../utilities/Paginator.js';

export default class AlbumTheTorturedPoetsDepartment extends Command {
  constructor() {
    super('theTorturedPoetsDepartment', {
      name: 'album the-tortured-poets-department',
      category: 'albums',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'album',
        shortName: 'the-tortured-poets-department',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply({ fetchReply: true });

    const embed1 = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/The_Tortured_Poets_Department',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TTPD.png')
      .setFooter({ text: 'Page 1 of 2 - Main Album Total Runtime: 65:08' })
      .setDescription(escapeNumberedList('**The Tortured Poets Department** will be released on __April 19, 2024__\n\n1. Fortnight (feat Post Malone) (3:48)\n2. The Tortured Poets Department (4:53)\n3. My Boy Only Breaks His Favorite Toys (3:23)\n4. Down Bad (4:21)\n5. So Long, London (4:22)\n6. But Daddy I Love Him (5:40)\n7. Fresh Out the Slammer (3:30)\n8. Florida!!! (feat Florence + The Machine) (3:35)\n9. Guilt as Sin? (4:14)'));

    const embed2 = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/The_Tortured_Poets_Department',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TTPD.png')
      .setFooter({ text: 'Page 2 of 2' })
      .setDescription(escapeNumberedList('**The Tortured Poets Department** will be released on __April 19, 2024__\n\n10. Who\'s Afraid of Little Old Me? (5:34)\n11. I Can Fix Him (No Really I Can) (2:36)\n12. loml (4:37)\n13. I Can Do It With a Broken Heart (3:38)\n14. The Smallest Man Who Ever Lived (4:05)\n15. The Alchemy (3:16)\n16. Clara Bow (3:36)\n17a. The Manuscript (:)\n17b. The Bolter (:)\n17c. The Albatross (:)\n17d. The Black Dog (:)'));

    const embedArray = [embed1, embed2];
    const paginator = new Paginator(interaction, embedArray, false);
    return await paginator.send();
  }
}
