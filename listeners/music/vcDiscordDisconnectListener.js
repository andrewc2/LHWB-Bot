const { Listener } = require('discord-akairo');
const {
  entersState,
  getVoiceConnection,
  VoiceConnectionStatus,
} = require('@discordjs/voice');
const voiceServers = require('../../voice-servers.json');
const { Events } = require('discord.js');
const { logger } = require('../../utilities/winstonLogging');

module.exports = class VcDiscordDisconnect extends Listener {
  constructor() {
    super('vcDiscordDisconnect', {
      emitter: 'client',
      category: 'music',
      event: Events.VoiceStateUpdate,
    });
  }

  async exec(oldState, newState) {
    if (newState.id !== this.client.user.id) return;
    const channels = voiceServers.map(x => x.channel_id);
    const stageChannels = voiceServers.map(x => x.stage_channel_id);
    const isVoiceChannel = !stageChannels.includes(oldState.channelId) || !channels.includes(oldState.channelId);
    if (!isVoiceChannel) return;
    const connection = getVoiceConnection(newState.guild.id);
    if (!connection) return;

    connection.on(VoiceConnectionStatus.Disconnected, async () => {
      try {
        await Promise.race([
          entersState(
            connection,
            VoiceConnectionStatus.Signalling,
            5_000,
          ),
          entersState(
            connection,
            VoiceConnectionStatus.Connecting,
            5_000,
          ),
        ]);
      }
      catch (error) {
        logger.log('error', error);
        connection.destroy();
      }
    });
  }
};
