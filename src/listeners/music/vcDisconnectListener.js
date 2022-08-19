const { Listener } = require('discord-akairo');
const { Events } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const voiceServers = require('../../../voice-servers.json');

module.exports = class VcDisconnectListener extends Listener {
  constructor() {
    super('vcDisconnectListener', {
      emitter: 'client',
      category: 'music',
      event: Events.VoiceStateUpdate,
    });
  }

  async exec(oldState, newState) {
    const channels = voiceServers.map(x => x.channel_id);
    const stageChannels = voiceServers.map(x => x.stage_channel_id);

    const isVoiceChannel = !stageChannels.includes(oldState.channelId) || !channels.includes(oldState.channelId);

    if (isVoiceChannel && newState.id === this.client.user.id && newState.channelId === null) {
      const server = voiceServers.find(voiceServer => voiceServer.server_id === oldState.guild.id);
      const channel = this.client.channels.cache.get(server.channel_id);
      if (!channel) return console.log('I cannot find the voice channel.');
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
      connection.state.subscription.player.unpause();
    }
  }
};
