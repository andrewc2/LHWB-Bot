const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const { isVoiceServerAndMod } = require('../../utilities/permissions');

module.exports = class PauseMessageCommand extends MessageCommand {
  constructor() {
    super('pause', {
      aliases: ['pause', 'lpause'],
      category: 'music',
      description: {
        content: 'Pauses music on the bot.',
        usage: 'pause',
        examples: ['pause'],
      },
      channel: 'guild',
    });
  }

  userPermissions(message) {
    return isVoiceServerAndMod(message);
  }

  async exec(message) {
    const connection = getVoiceConnection(message.guild.id);

    if (!connection) {
      return message.channel.send({ embeds: [
        new EmbedBuilder()
          .setDescription('Connection to voice channel not found.')
          .setColor(Colors.Red),
      ] });
    }

    const embed = new EmbedBuilder()
      .setDescription('Music has been paused. :pause_button:')
      .setColor(Colors.Green);

    if (connection.state.subscription.player.state.status === 'playing') {
      connection.state.subscription.player.pause();
      return message.channel.send({ embeds: [embed] });
    }
    else {
      return message.channel.send({
        embeds: [
          embed
            .setDescription('Music is already paused.')
            .setColor(Colors.Red),
        ],
      });
    }
  }
};
