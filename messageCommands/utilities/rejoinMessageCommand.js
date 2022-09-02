const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const {	joinVoiceChannel } = require('@discordjs/voice');
const { isVoiceServerAndMod } = require('../../utilities/permissions');
const voiceServers = require('../../voice-servers.json');
const { logger } = require('../../utilities/winstonLogging');

module.exports = class RejoinMessageCommand extends MessageCommand {
  constructor() {
    super('rejoin', {
      aliases: ['rejoin'],
      category: 'utility',
      cooldown: 30000,
      ratelimit: 1,
      channel: 'guild',
      description: {
        content: 'Reconnect and resume playing music in default channel.',
        usage: 'rejoin',
        examples: [
          'rejoin',
        ],
      },
    });
  }

  async userPermissions(message) {
    return isVoiceServerAndMod(message);
  }

  exec(message) {
    const channel = message.client.channels.cache.get(voiceServers.find(x => x.server_id === message.guild.id).channel_id);
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
    if (!channel) return logger.log('warn', 'I cannot find the voice channel');
    connection.state.subscription.player.unpause();
    const embed = new EmbedBuilder()
      .setDescription('Automatically reconnecting to the default voice channel.')
      .setColor('#9979FF');
    return message.channel.send({ embeds: [embed] });
  }
};
