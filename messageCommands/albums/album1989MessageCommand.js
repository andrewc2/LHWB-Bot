const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');

module.exports = class Album1989MessageCommand extends MessageCommand {
  constructor() {
    super('1989', {
      aliases: ['1989'],
      category: 'albums',
      description: {
        content: 'Displays the track list for Taylor Swift\'s album 1989.',
        usage: '1989',
        examples: [
          '1989',
        ],
      },
    });
  }

  exec(message) {
    const embed = new EmbedBuilder()
      .setColor(13484710)
      .setAuthor({ name: 'Taylor Swift', iconURL: 'https://lhwb.dev/ts.png', url: 'https://en.wikipedia.org/wiki/1989_(Taylor_Swift_album)' })
      .setThumbnail('https://i.imgur.com/i1QDoZR.jpg')
      .setDescription('**1989** was released on __October 27, 2014__ \n\n1. Welcome to New York\n2. Blank Space\n3. Style\n4. Out of the Woods\n5. All You Had to Do Was Stay\n6. Shake It Off\n7. I Wish You Would\n8. Bad Blood\n9. Wildest Dreams\n10. How You Get the Girl\n11. This Love\n12. I Know Places\n13. Clean\n\n__Deluxe Version__\n14. Wonderland\n15. You Are In Love\n16. New Romantics');
    message.channel.send({ embeds: [embed] });
  }
};
