const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');

module.exports = class Tour1989SetlistSlashCommand extends SlashCommand {
  constructor() {
    super('1989-tour-setlist', {
      name: 'tour 1989-tour-setlist',
      prefixId: '1989-tour-setlist',
      category: 'tours',
      commandType: 'sub',
      parentCommand: 'tour',
      shortName: '1989-setlist',
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(568027)
      .setAuthor({
        name: 'Typical 1989 World Tour Setlist',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=3d0a56f',
      })
      .setThumbnail('https://i.imgur.com/tIO68fu.jpg')
      .setDescription('1. Welcome to New York\n2. New Romantics\n3. Blank Space\n4. I Knew You Were Trouble (Rock Version)\n5. I Wish You Would\n6. How You Get the Girl\n7. I Know Places\n8. All You Had to Do Was Stay or Fifteen or You Belong With Me (some cities got two of these)\n9. Special Guest (!1989guests) / Some cities got Wonderland\n10. You Are In Love (Acoustic - some early cities)\n11. Clean\n12. Love Story (Synth Version)\n13. Style\n14. This Love\n15. Bad Blood\n16. We Are Never Ever Getting Back Together (Rock Version)\n17. Enchanted / Wildest Dreams\n18. Out of the Woods\n19. Shake It Off');

    return interaction.reply({ embeds: [embed] });
  }
};
