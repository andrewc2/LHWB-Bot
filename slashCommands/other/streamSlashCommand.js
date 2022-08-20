const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');

module.exports = class StreamSlashCommand extends SlashCommand {
  constructor() {
    super('livestream', {
      name: 'livestream',
      prefixId: 'livestream',
      category: 'other',
      commandType: 'command',
      description: 'Displays information about live streams.',
    });
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setColor(5218488)
      .setAuthor({
        name: 'Live Stream',
        iconURL: 'https://lhwb.dev/ts.png',
        url: 'https://speaknow.rocks:1989/player/',
      })
      .setURL('https://speaknow.rocks:1989/player/')
      .setDescription('[HLS Stream Player](https://speaknow.rocks:1989/)\n\nStream will be at minimum 30sec behind from live\nIf you have issues please refresh your browser first or adjust the quality level.')
      .setFooter({ text: 'Please do not share this stream outside of this discord server, or this stream will not be able to be provided.' });
        return interaction.reply({ embeds: [embed] });
  }
};
