const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const { isVoiceServerAndMod } = require('../../utilities/permissions');

module.exports = class PauseSlashCommand extends SlashCommand {
  constructor() {
    super('pause', {
      name: 'pause',
      prefixId: 'pause',
      category: 'music',
      channel: 'guild',
      commandType: 'command',
      description: 'Pauses music on the bot',
    });
  }

  userPermissions(message) {
    return isVoiceServerAndMod(message);
  }

  async exec(interaction) {
    await interaction.deferReply();
    const connection = getVoiceConnection(interaction.guild.id);

    if (!connection) {
      return interaction.editReply({ embeds: [
        new EmbedBuilder()
          .setDescription('Connection to voice channel not found.')
          .setColor(Colors.Red),
      ],
      });
    }

    const embed = new EmbedBuilder()
      .setDescription('Music has been paused. :pause_button:')
      .setColor(Colors.Green);

    if (connection.state.subscription.player.state.status === 'playing') {
      connection.state.subscription.player.pause();
      return interaction.editReply({ embeds: [embed] });
    }
    else {
      return interaction.editReply({
        embeds: [
          embed
            .setDescription('Music is already paused.')
            .setColor(Colors.Red),
        ],
      });
    }
  }
};
