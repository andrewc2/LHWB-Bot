const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { isVoiceServer } = require('../../../utilities/permissions');

module.exports = class TrackListSlashCommand extends SlashCommand {
  constructor() {
    super('trackList', {
      name: 'track list',
      prefixId: 'tracks',
      category: 'music',
      channel: 'guild',
      commandType: 'sub',
      parentCommand: 'track',
      shortName: 'list',
    });
  }

  userPermissions(message) {
    if (isVoiceServer(message.guild.id)) return 'Server';
  }

  async exec(interaction) {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.client.user.username} TrackList`,
        iconURL: interaction.client.user.displayAvatarURL({ forceStatic: false, extension: 'png' }),
        url: interaction.client.user.displayAvatarURL({ forceStatic: false, extension: 'png' }),
      })
      .setDescription('The full requestable track list is here: https://lhwb.dev/lhwb.php')
      .setColor('#9979FF');
    return interaction.reply({ embeds: [embed] });
  }
};
