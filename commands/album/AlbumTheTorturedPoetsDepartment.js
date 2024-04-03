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
      .setFooter({ text: 'Page 1 of 2 - Main Album Total Runtime: tbd' })
      .setDescription(escapeNumberedList('**The Tortured Poets Department** will be released on __April 19, 2024__\n\n1. Fortnight (feat Post Malone) (:)\n2. The Tortured Poets Department (:)\n3. My Boy Only Breaks His Favorite Toys (:)\n4. Down Bad (:)\n5. So Long, London (:)\n6. But Daddy I Love Him (:)\n7. Fresh Out the Slammer (:)\n8. Florida!!! (feat Florene + The Machine) (:)\n9. Guilt as Sin? (:)'));

    const embed2 = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/The_Tortured_Poets_Department',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TTPD.png')
      .setFooter({ text: 'Page 2 of 2' })
      .setDescription(escapeNumberedList('**The Tortured Poets Department** will be released on __April 19, 2024__\n\n10. Who\'s Afraid of Little Old Me? (:)\n11. I Can Fix Him (No Really I Can) (:)\n12. loml (:)\n13. I Can Do It With a Broken Heart (:)\n14. The Smallest Man Who Ever Lived (:)\n15. The Alchemy (:)\n16. Clara Bow (:)\n17a. The Manuscript (:)\n17b. The Bolter (:)\n17c. The Albatross (:)\n17d. The Black Dog (:)'));

    const embedArray = [embed1, embed2];
    const paginator = new Paginator(interaction, embedArray, false);
    return await paginator.send();
  }
}
