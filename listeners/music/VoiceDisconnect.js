import { Events } from 'discord.js';
import Listener from '../../structure/listeners/Listener.js';
import Utilities from '../../utilities/Utilities.js';

export default class VoiceDisconnect extends Listener {
  constructor() {
    super('voiceDisconnect', {
      emitter: 'client',
      category: 'music',
      event: Events.VoiceStateUpdate,
    });
  }

  async exec(oldState, newState) {
    const server = Utilities.getVoiceServer(this.client, oldState.guild.id);
    if (server && newState.id === this.client.user.id && newState.channelId === null) {
      server.reestablishConnection();
    }
  }
}
