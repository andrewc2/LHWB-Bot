const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { isVoiceServerAndMod } = require('../../utilities/permissions');
const voiceServers = require('../../voice-servers.json');
const { joinVoiceChannel } = require('@discordjs/voice');
const { logger } = require('../../utilities/winstonLogging');

module.exports = class RejoinSlashCommand extends SlashCommand {
  constructor() {
    super('rejoin', {
      name: 'rejoin',
      commandType: 'command',
      prefixId: 'rejoin',
      description: 'Reconnect and resume playing music in default channel',
      category: 'other',
    });
  }

  async userPermissions(message) {
    return isVoiceServerAndMod(message);
  }

  async exec(interaction) {
    await interaction.deferReply();
    const channel = interaction.client.channels.cache.get(voiceServers.find(x => x.server_id === interaction.guild.id).channel_id);
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
    return interaction.editReply({ embeds: [embed] });
  }
};
