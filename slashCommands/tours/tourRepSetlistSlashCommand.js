const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');

module.exports = class RepTourSetlistSlashCommand extends SlashCommand {
  constructor() {
    super('reputation-tour-setlist', {
      name: 'tour reputation-tour-setlist',
      prefixId: 'reputation-tour-setlist',
      category: 'tours',
      commandType: 'sub',
      parentCommand: 'tour',
      shortName: 'reputation-setlist',
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(568027)
      .setAuthor({
        name: 'Typical reputation Stadium Tour Setlist',
        iconURL:'https://lhwb.dev/ts.png',
        url: 'https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=3d0a56f',
      })
      .setThumbnail('https://i.imgur.com/Zhg0oXF.jpg')
      .setDescription('Before Taylor: Bad Reputation\n\nreputation Video\n\n1. ...Ready for It?\n2. I Did Something Bad\n3. Gorgeous\n4. Style / Love Story / You Belong With Me\n\nLook What You Made Me Do Video\n\n5. Look What You Made Me Do\n6. End Game (no verses)\n7. King of My Heart\n8. Delicate (flying to bstage)\n9. Shake It Off (left bstage)\n10. Dancing With Our Hands Tied [Exchanges with So It Goes...] (left bstage)\n11. Secret Song (left bstage)\n12. Blank Space (right bstage)\n13. Dress (right bstage)\n14. Bad Blood / Should\'ve Said No\n15. Don\'t Blame Me\n16. Long Live / New Year\'s Day\n\nWhy She Disappeared video\n\n17. Getaway Car\n18. Call It What You Want\n19. We Are Never Ever Getting Back Together / This Is Why We Can\'t Have Nice Things\n\nSo It Goes (Credits Video)');

    return interaction.reply({ embeds: [embed] });
  }
};
