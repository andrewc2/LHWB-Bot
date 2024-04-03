import Command from '../../../structure/commands/Command.js';
import { EmbedBuilder, escapeNumberedList } from 'discord.js';

export default class TourRedSetList extends Command {
  constructor() {
    super('tourRedSetList', {
      name: 'tour red setlist',
      category: 'tours',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'red',
        shortName: 'setlist',
      },
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(11476553)
      .setAuthor({
        name: 'The Red Tour - Typical Setlist',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=bd6adba',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/TheRedTour.png')
      .setDescription(escapeNumberedList('1. State of Grace\n2. Holy Ground\n3. Red\n4. You Belong with Me\n5. The Lucky One\n6. Mean\n7. Stay Stay Stay (contains elements of \'Ho Hey\')\n8. 22\n9. I Almost Do\n10. Everything Has Changed (with Ed Sheeran)\n11. Begin Again\n12. Sparks Fly\n13. I Knew You Were Trouble\n14. All Too Well\n15. Love Story\n16. Treacherous\n\nEncore\n17. We Are Never Ever Getting Back Together\n\nStarting on May 30, 2014 (Asia Leg), \'You Belong With Me\' replaced \'Begin Again\'. Additionally, \'Everything Has Changed\' and \'Treacherous\' were removed from the set list.'));

    return interaction.reply({ embeds: [embed] });
  }
}
