import Command from '../../structure/commands/Command.js';
import { EmbedBuilder, escapeNumberedList } from 'discord.js';
import Paginator from '../../utilities/Paginator.js';

export default class AlbumSpeakNow extends Command {
  constructor() {
    super('speakNow', {
      name: 'album speak-now',
      category: 'albums',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'album',
        shortName: 'speak-now',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply({ fetchReply: true });

    const embedTV = new EmbedBuilder()
      .setColor(6892915)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/Speak_Now_(Taylor%27s_Version)',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/SpeakNowTV.png')
      .setFooter({ text: 'Page 1 of 3 - Total Runtime: 104:33' })
      .setDescription(escapeNumberedList('**Speak Now** was released on __October 25, 2010__\n**Speak Now (Taylor\'s Version)** was released __July 7, 2023__\n\n1. Mine (Taylor’s Version) (3:51)\n2. Sparks Fly (Taylor’s Version) (4:21)\n3. Back To December (Taylor’s Version) (4:54)\n4. Speak Now (Taylor’s Version) (4:02)\n5. Dear John (Taylor’s Version) (6:45)\n6. Mean (Taylor’s Version) (3:58)\n7. The Story of Us (Taylor’s Version) (4:27)\n8. Never Grow Up (Taylor’s Version) (4:52)\n9. Enchanted (Taylor’s Version) (5:53)\n10. Better Than Revenge (Taylor’s Version) (3:40)\n11. Innocent (Taylor’s Version) (5:01)'));

    const embedTVp2 = new EmbedBuilder()
      .setColor(6892915)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/Speak_Now_(Taylor%27s_Version)',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/SpeakNowTV.png')
      .setFooter({ text: 'Page 2 of 3 - Total Runtime: 104:33' })
      .setDescription(escapeNumberedList('**Speak Now** was released on __October 25, 2010__\n**Speak Now (Taylor\'s Version)** was released __July 7, 2023__\n\n12. Haunted (Taylor’s Version) (4:05)\n13. Last Kiss (Taylor’s Version) (6:09)\n14. Long Live (Taylor’s Version) (5:17)\n15. Ours (Taylor’s Version) (3:55)\n16. Superman (Taylor’s Version) (4:34)\n17. Electric Touch (ft. Fall Out Boy) (From The Vault) (4:26)\n18. When Emma Falls In Love (From The Vault) (4:12)\n19. I Can See You (From The Vault) (4:33)\n20. Castles Crumbling (ft. Haley Williams) (From The Vault) (5:06)\n21. Foolish One (From The Vault) (5:11)\n22. Timeless (From The Vault) (5:21)'));

    const embed = new EmbedBuilder()
      .setColor(6892915)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/Speak_Now',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/SpeakNow.png')
      .setFooter({ text: 'Page 3 of 3 - Total Runtime: 67:29' })
      .setDescription(escapeNumberedList('**Speak Now** was released on __October 25, 2010__\n\n1. Mine (3:50)\n2. Sparks Fly (4:20)\n3. Back to December (4:53)\n4. Speak Now (4:00)\n5. Dear John (6:43)\n6. Mean (3:57)\n7. The Story of Us (4:25)\n8. Never Grow Up (4:50)\n9. Enchanted (5:53)\n10. Better Than Revenge (3:37)\n11. Innocent (5:02)\n12. Haunted (4:02)\n13. Last Kiss (6:07)\n14. Long Live (5:17)\n\n__Deluxe Version__\n15. Ours (3:58)\n16. If This Was A Movie (3:54)\n17. Superman (4:36)\n18. Back to December (acoustic) (4:52)\n19. Haunted (acoustic) (3:37)\n20. Mine (pop mix) (3:50)'));

    const embedArray = [embedTV, embedTVp2, embed];
    const paginator = new Paginator(interaction, embedArray, false);
    return await paginator.send();
  }
}
