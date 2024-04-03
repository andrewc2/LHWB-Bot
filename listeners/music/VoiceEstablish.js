import { Events } from 'discord.js';
import Listener from '../../structure/listeners/Listener.js';

export default class VoiceEstablish extends Listener {
  constructor() {
    super('voiceEstablish', {
      emitter: 'client',
      category: 'music',
      event: Events.ClientReady,
    });
  }

  async exec() {
    for (const voiceServer of this.client.voiceServers) {
      await voiceServer.establishConnection();
    }
  }
}
