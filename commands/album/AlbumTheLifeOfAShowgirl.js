import Command from '../../structure/commands/Command.js';
import { EmbedBuilder, escapeNumberedList } from 'discord.js';
import Paginator from '../../utilities/Paginator.js';

export default class AlbumTheLifeOfAShowgirl extends Command {
  constructor() {
    super('theLifeOfAShowgirl', {
      name: 'album the-life-of-a-showgirl',
      category: 'albums',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'album',
        shortName: 'the-life-of-a-showgirl',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply({ fetchReply: true });

    const embed1 = new EmbedBuilder()
      .setColor(0xff6b35)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/The_Life_of_a_Showgirl',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TLOAS.png')
      .setFooter({ text: 'Page 1 of 2 - Total Runtime: x:xx' })
      .setDescription(escapeNumberedList('**The Life of a Showgirl** will be released on __October 3, 2025__\n\n1. The Fate of Ophelia (x:xx)\n2. Elizabeth Taylor (x:xx)\n3. Opalite (x:xx)\n4. Father Figure (x:xx)\n5. Eldest Daughter (x:xx)\n6. Ruin The Friendship (x:xx)'));

    const embed2 = new EmbedBuilder()
      .setColor(0xff6b35)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/The_Life_of_a_Showgirl',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TLOAS.png')
      .setFooter({ text: 'Page 2 of 2' })
      .setDescription(escapeNumberedList('**The Life of a Showgirl** will be released on __October 3, 2025__\n\n7. Actually Romantic (x:xx)\n8. Wi$h Li$t (x:xx)\n9. Wood (x:xx)\n10. CANCELLED! (x:xx)\n11. Honey (x:xx)\n12. The Life of a Showgirl (feat. Sabrina Carpenter) (x:xx)'));

    const embedArray = [embed1, embed2];
    const paginator = new Paginator(interaction, embedArray, false);
    return await paginator.send();
  }
}
