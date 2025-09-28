import { Listener } from '@lhwb/framework';
import { Events, VoiceState } from 'discord.js';

import Utilities from '../../modules/tool/Utilities.js';

export default class VoiceDisconnect extends Listener {
  constructor() {
    super('voiceDisconnect', {
      emitter: 'client',
      category: 'music',
      event: Events.VoiceStateUpdate,
    });
  }

  async exec(oldState: VoiceState, newState: VoiceState) {
    const server = Utilities.getMusicServer(this.client, oldState.guild.id);
    if (server && newState.id === this.client.user?.id && !newState.channelId) {
      server.reestablishConnection();
    }
  }
}
