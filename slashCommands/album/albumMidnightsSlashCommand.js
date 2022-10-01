const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');

module.exports = class AlbumMidnightsSlashCommand extends SlashCommand {
  constructor() {
    super('midnights', {
      name: 'album midnights',
      prefixId: 'midnights',
      category: 'albums',
      commandType: 'sub',
      parentCommand: 'album',
      shortName: 'midnights',
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(7379373)
      .setAuthor({
        name: 'Taylor Swift',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://en.wikipedia.org/wiki/Midnights',
      })
      .setThumbnail('https://i.imgur.com/8swRZ5l.png')
      .setDescription('**Midnights** will be released on __October 21, 2022__ \n\n1. Track One\n2. Maroon\n3. Track Three\n4. Track Four\n5. Track Five\n6. Midnight Rain\n7. Question...?\n8. Vigilante Shit\n9. Track Nine\n10. Track Ten\n11. Track Eleven\n12. Track Twelve\n13. Mastermind');

    return interaction.reply({ embeds: [embed] });
  }
};