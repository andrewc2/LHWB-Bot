import { Listener } from '@lhwb/framework';
import { Events } from 'discord.js';

export default class VoiceEstablish extends Listener {
  constructor() {
    super('voiceEstablish', {
      emitter: 'client',
      category: 'music',
      event: Events.ClientReady,
    });
  }

  async exec() {
    for (const musicServer of this.client.musicServers) {
      await musicServer.establishConnection();
    }
  }
}
