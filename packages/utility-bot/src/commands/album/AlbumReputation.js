import { Command } from '@lhwb/framework';
import { EmbedBuilder, escapeNumberedList } from 'discord.js';

export default class AlbumReputation extends Command {
  constructor() {
    super('reputation', {
      name: 'album reputation',
      description:
        "Displays the track-list for Taylor Swift's album reputation",
      category: 'albums',
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(12040119)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://en.wikipedia.org/wiki/Reputation_(Taylor_Swift_album)',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/reputation.png')
      .setDescription(
        escapeNumberedList(
          "**reputation** was released on __November 10, 2017__ \n\n1. ...Ready For It?\n2. End Game (ft. Ed Sheeran and Future)\n3. I Did Something Bad\n4. Don't Blame Me\n5. Delicate\n6. Look What You Made Me Do\n7. So It Goes...\n8. Gorgeous\n9. Getaway Car\n10. King Of My Heart\n11. Dancing With Our Hands Tied\n12. Dress\n13. This Is Why We Can't Have Nice Things\n14. Call It What You Want\n15. New Year's Day",
        ),
      );

    return interaction.editReply({ embeds: [embed] });
  }
}
