import Command from '../../structure/commands/Command.js';
import { EmbedBuilder, escapeNumberedList } from 'discord.js';

export default class AlbumLover extends Command {
  constructor() {
    super('lover', {
      name: 'album lover',
      category: 'albums',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'album',
        shortName: 'lover',
      },
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(15651566)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/Lover_(album)',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/Lover.png')
      .setDescription(escapeNumberedList('**Lover** was released on __August 23, 2019__ \n\n1. I Forgot That You Existed\n2. Cruel Summer\n3. Lover\n4. The Man\n5. The Archer\n6. I Think He Knows\n7. Miss Americana & The Heartbreak Prince\n8. Paper Rings\n9. Cornelia Street\n10. Death By A Thousand Cuts\n11. London Boy\n12. Soon You\'ll Get Better (ft. The Chicks)\n13. False God\n14. You Need To Calm Down\n15. Afterglow\n16. ME! (ft. Brendon Urie)\n17. It\'s Nice To Have A Friend\n18. Daylight'));

    return interaction.reply({ embeds: [embed] });
  }
}
