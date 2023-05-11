const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { pagination } = require('../../utilities/pagination');

module.exports = class AlbumSpeakNowSlashCommand extends SlashCommand {
  constructor() {
    super('speakNow', {
      name: 'album speak-now',
      prefixId: 'speakNow',
      category: 'albums',
      commandType: 'sub',
      parentCommand: 'album',
      shortName: 'speak-now',
    });
  }

  async exec(interaction, message) {
    await interaction.deferReply({ fetchReply: true });

    const embedTV = new EmbedBuilder()
      .setColor(6892915)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Speak_Now_(Taylor%27s_Version)',
      })
      .setThumbnail('https://i.imgur.com/LLuF2e4.png')
      .setFooter({ text: 'Page 1 of 2 - Total Runtime: tba' })
      .setDescription('**Speak Now** was released on __October 25, 2010__\n**Speak Now (Taylor\'s Version)** will be released __July 7, 2023__\n\n1. Mine (Taylor’s Version)\n2. Sparks Fly (Taylor’s Version)\n3. Back To December (Taylor’s Version)\n4. Speak Now (Taylor’s Version)\n5. Dear John (Taylor’s Version)\n6. Mean (Taylor’s Version)\n7. The Story of Us (Taylor’s Version)\n8. Never Grow Up (Taylor’s Version)\n9. Enchanted (Taylor’s Version)\n10. Better Than Revenge (Taylor’s Version)\n11. Innocent (Taylor’s Version)');

    const embedTVp2 = new EmbedBuilder()
      .setColor(6892915)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Speak_Now_(Taylor%27s_Version)',
      })
      .setThumbnail('https://i.imgur.com/LLuF2e4.png')
      .setFooter({ text: 'Page 2 of 2 - Total Runtime: tba' })
      .setDescription('**Speak Now** was released on __October 25, 2010__\n**Speak Now (Taylor\'s Version)** will be released __July 7, 2023__\n\n12. Haunted (Taylor’s Version)\n13. Last Kiss (Taylor’s Version)\n14. Long Live (Taylor’s Version)\n15. Ours (Taylor’s Version)\n16. Superman (Taylor’s Version)\n17. Vault (From The Vault)\n18. Vault (From The Vault)\n19. Vault (From The Vault)\n20. Vault (From The Vault)\n21. Vault (From The Vault)\n22. Vault (From The Vault)');

    const embed = new EmbedBuilder()
      .setColor(6892915)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Speak_Now',
      })
      .setThumbnail('https://i.imgur.com/TNKbt8Y.jpg')
      .setDescription('**Speak Now** was released on __October 25, 2010__\n\n1. Mine\n2. Sparks Fly\n3. Back to December\n4. Speak Now\n5. Dear John\n6. Mean\n7. The Story of Us\n8. Never Grow Up\n9. Enchanted\n10. Better Than Revenge\n11. Innocent\n12. Haunted\n13. Last Kiss\n14. Long Live\n\n__Deluxe Version__\n15. Ours\n16. If This Was A Movie\n17. Superman');

    const embedArray = [embedTV, embedTVp2, embed];

    return await pagination(message, embedArray, false);
  }
};
