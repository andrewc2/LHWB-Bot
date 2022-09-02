const { Listener } = require('discord-akairo');
const { Events, PermissionsBitField } = require('discord.js');
const voiceServers = require('../../voice-servers.json');

module.exports = class StageInstanceCreateListener extends Listener {
  constructor() {
    super('stageInstanceCreateListener', {
      emitter: 'client',
      category: 'music',
      event: Events.StageInstanceCreate,
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
      { ViewChannel: true },
      { reason: 'Stage Channel\'s Companion Text Channel Was Unlocked Due To Event Starting' },
    );
  }
};
