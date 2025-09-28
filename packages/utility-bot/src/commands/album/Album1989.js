import { Command } from '@lhwb/framework';
import { Paginator } from '@lhwb/shared';
import { EmbedBuilder, escapeNumberedList } from 'discord.js';

export default class Album1989 extends Command {
  constructor() {
    super('1989', {
      name: 'album 1989',
      description: "Displays the track-list for Taylor Swift's album 1989",
      category: 'albums',
    });
  }

  async exec(interaction) {
    const embedTV = new EmbedBuilder()
      .setColor(7706804)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/1989_(Taylor%27s_Version)',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/1989TV.png')
      .setFooter({ text: 'Page 1 of 3 - Total Runtime: 77:49' })
      .setDescription(
        escapeNumberedList(
          "**1989** was released on __October 27, 2014__\n**1989 (Taylor's Version)** was released __October 27, 2023__\n\n1. Welcome to New York (Taylor’s Version) (3:32)\n2. Blank Space (Taylor’s Version) (3:51)\n3. Style (Taylor’s Version) (3:51)\n4. Out of the Woods (Taylor’s Version) (3:55)\n5. All You Had to Do Was Stay (Taylor’s Version) (3:13)\n6. Shake It Off (Taylor’s Version) (3:39)\n7. I Wish You Would (Taylor’s Version) (3:27)\n8. Bad Blood (Taylor’s Version) (3:31)\n9. Wildest Dreams (Taylor’s Version) (3:40)\n10. How You Get the Girl (Taylor’s Version) (4:07)\n11. This Love (Taylor’s Version) (4:10)",
        ),
      );

    const embedTVp2 = new EmbedBuilder()
      .setColor(7706804)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/1989_(Taylor%27s_Version)',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/1989TV.png')
      .setFooter({ text: 'Page 2 of 3 - Total Runtime: 77:49' })
      .setDescription(
        escapeNumberedList(
          '**1989** was released on __October 27, 2014__\n**1989 (Taylor\'s Version)** was released __October 27, 2023__\n\n12. I Know Places (Taylor’s Version) (3:15)\n13. Clean (Taylor’s Version) (4:31)\n14. Wonderland (Taylor’s Version) (4:05)\n15. You Are In Love (Taylor’s Version) (4:27)\n16. New Romantics (Taylor’s Version) (3:50)\n17. "Slut!" (From The Vault) (3:00)\n18. Say Don\'t Go (From The Vault) (4:39)\n19. Now That We Don\'t Talk (From The Vault) (2:26)\n20. Suburban Legends (From The Vault) (2:51)\n21. Is It Over Now? (From The Vault) (3:49)\nTangerine: 22. Sweeter Than Fiction (3:54)\nDeluxe: 22. Bad Blood (ft. Kendrick Lamar) (Taylor\'s Version) (3:20)\nDeluxe +: 23. "Slut!" (acoustic version) (From The Vault) (3:00)',
        ),
      );

    const embed = new EmbedBuilder()
      .setColor(7706804)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/1989_(Taylor_Swift_album)',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/1989.png')
      .setFooter({ text: 'Page 3 of 3 - Total Runtime: 48:41 | Deluxe: 68:37' })
      .setDescription(
        escapeNumberedList(
          '**1989** was released on __October 27, 2014__\n\n1. Welcome to New York (3:32)\n2. Blank Space (3:51)\n3. Style (3:51)\n4. Out of the Woods (3:55)\n5. All You Had to Do Was Stay (3:13)\n6. Shake It Off (3:39)\n7. I Wish You Would (3:27)\n8. Bad Blood (3:31)\n9. Wildest Dreams (3:40)\n10. How You Get the Girl (4:07)\n11. This Love (4:10)\n12. I Know Places (3:15)\n13. Clean (4:30)\n\n__Deluxe Version__\n14. Wonderland (4:05)\n15. You Are In Love (4:27)\n16. New Romantics (3:50)',
        ),
      );

    const embedArray = [embedTV, embedTVp2, embed];
    const paginator = new Paginator(
      interaction,
      embedArray,
      this.client.logger,
      false,
    );
    return await paginator.send();
  }
}
