const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { isVoiceServerAndMod } = require('../../utilities/permissions');
const voiceServers = require('../../voice-servers.json');
const { joinVoiceChannel } = require('@discordjs/voice');
const { logger } = require('../../utilities/winstonLogging');

module.exports = class StageSlashCommand extends SlashCommand {
  constructor() {
    super('stage', {
      name: 'stage',
      commandType: 'command',
      prefixId: 'stage',
      description: 'Join the servers stage channel',
      category: 'other',
    });
  }

  async userPermissions(message) {
    return isVoiceServerAndMod(message);
  }

  async exec(interaction) {
    await interaction.deferReply();
    const channel = interaction.client.channels.cache.get(voiceServers.find(x => x.server_id === interaction.guild.id).stage_channel_id);
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    if (!channel) return logger.log('warn', 'I cannot find the stage channel');

    function handleStageConnection() {
      void interaction.guild.members.me.voice.setSuppressed(false);
      connection.state.subscription.player.unpause();
      const embed = new EmbedBuilder()
        .setDescription('Switched to the stage channel.')
        .setColor('#9979FF');
      return interaction.editReply({ embeds: [embed] });
    }

    setTimeout(handleStageConnection, 1000);
  }
};
