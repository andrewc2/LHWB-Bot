import { Command } from '@lhwb/framework';
import { Paginator } from '@lhwb/shared';
import { EmbedBuilder, escapeNumberedList } from 'discord.js';

export default class AlbumTheLifeOfAShowgirl extends Command {
  constructor() {
    super('theLifeOfAShowgirl', {
      name: 'album the-life-of-a-showgirl',
      description:
        "Displays the track-list for Taylor Swift's album The Life of a Showgirl",
      category: 'albums',
    });
  }

  async exec(interaction) {
    const embed1 = new EmbedBuilder()
      .setColor(0xff6b35)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/The_Life_of_a_Showgirl',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TLOAS.png')
      .setFooter({ text: 'Page 1 of 2 - Total Runtime: 41:40' })
      .setDescription(
        escapeNumberedList(
          '**The Life of a Showgirl** was released on __October 3, 2025__\n\n1. The Fate of Ophelia (3:46)\n2. Elizabeth Taylor (3:28)\n3. Opalite (3:55)\n4. Father Figure (3:32)\n5. Eldest Daughter (4:06)\n6. Ruin The Friendship (3:40)',
        ),
      );

    const embed2 = new EmbedBuilder()
      .setColor(0xff6b35)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/The_Life_of_a_Showgirl',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TLOAS.png')
      .setFooter({ text: 'Page 2 of 2 - Total Runtime: 41:40' })
      .setDescription(
        escapeNumberedList(
          '**The Life of a Showgirl** was be released on __October 3, 2025__\n\n7. Actually Romantic (2:43)\n8. Wi$h Li$t (3:27)\n9. Wood (2:30)\n10. CANCELLED! (3:31)\n11. Honey (3:01)\n12. The Life of a Showgirl (feat. Sabrina Carpenter) (4:01)',
        ),
      );

    const embedArray = [embed1, embed2];
    const paginator = new Paginator(
      interaction,
      embedArray,
      this.client.logger,
      false,
    );
    return await paginator.send();
  }
}
