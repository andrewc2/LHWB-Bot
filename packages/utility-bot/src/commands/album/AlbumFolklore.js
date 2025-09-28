import { Command } from '@lhwb/framework';
import { EmbedBuilder, escapeNumberedList } from 'discord.js';

export default class AlbumFolklore extends Command {
  constructor() {
    super('folklore', {
      name: 'album folklore',
      description: "Displays the track-list for Taylor Swift's album folklore",
      category: 'albums',
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(12040119)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/Folklore_(Taylor_Swift_album)',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/folklore.png')
      .setDescription(
        escapeNumberedList(
          '**folklore** was released on __July 24, 2020__ \n\n1. the 1\n2. cardigan\n3. the last great american dynasty\n4. exile (featuring Bon Iver)\n5. my tears ricochet\n6. mirrorball\n7. seven\n8. august\n9. this is me trying\n10. illicit affairs\n11. invisible string\n12. mad woman\n13. epiphany\n14. betty\n15. peace\n16. hoax\n\nDeluxe\n17. the lakes',
        ),
      );

    return interaction.editReply({ embeds: [embed] });
  }
}
