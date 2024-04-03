import Command from '../../../structure/commands/Command.js';
import { EmbedBuilder, escapeNumberedList } from 'discord.js';
import Utilities from '../../../utilities/Utilities.js';

export default class Tour1989SetList extends Command {
  constructor() {
    super('tour1989SetList', {
      name: 'tour 1989 setlist',
      category: 'tours',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: '1989',
        shortName: 'setlist',
      },
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(568027)
      .setAuthor({
        name: 'Typical 1989 World Tour Setlist',
        iconURL: 'https://cdn.lhwb.dev/i/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=3d0a56f',
      })
      .setThumbnail('https://cdn.lhwb.dev/i/1989WorldTour.png')
      .setDescription(escapeNumberedList(`1. Welcome to New York\n2. New Romantics\n3. Blank Space\n4. I Knew You Were Trouble (Rock Version)\n5. I Wish You Would\n6. How You Get the Girl\n7. I Know Places\n8. All You Had to Do Was Stay or Fifteen or You Belong With Me (some cities got two of these)\n9. Special Guest (${Utilities.getCommandMention(this.client, 'tour 1989 secret-songs')}) / Some cities got Wonderland\n10. You Are In Love (Acoustic - some early cities)\n11. Clean\n12. Love Story (Synth Version)\n13. Style\n14. This Love\n15. Bad Blood\n16. We Are Never Ever Getting Back Together (Rock Version)\n17. Enchanted / Wildest Dreams\n18. Out of the Woods\n19. Shake It Off`));

    return interaction.reply({ embeds: [embed] });
  }
}
