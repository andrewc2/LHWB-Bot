const { Listener } = require('discord-akairo');
const { Events, PermissionsBitField } = require('discord.js');
const voiceServers = require('../../voice-servers.json');

module.exports = class StageInstanceDeleteListener extends Listener {
  constructor() {
    super('stageInstanceDeleteListener', {
      emitter: 'client',
      category: 'music',
      event: Events.StageInstanceDelete,
    });
  }

  async exec(stageInstance) {
    const stageServer = voiceServers.find(voiceServer => voiceServer.server_id === stageInstance.guildId);
    if (!stageServer) return;
    const companionStageChannelId = stageServer.companion_stage_channel_id;
    const channel = this.client.channels.cache.get(companionStageChannelId);

    if (
      !channel.permissionsFor(stageInstance.guild.members.me).has(
        [
          PermissionsBitField.Flags.ManageRoles,
          PermissionsBitField.Flags.ViewChannel,
        ],
      )
    ) return;

    return await channel.permissionOverwrites.edit(
      channel.guild.roles.everyone,
      { ViewChannel: false },
      { reason: 'Stage Channel\'s Companion Text Channel Was Locked Due To Event Ending' },
    );
  }
};
