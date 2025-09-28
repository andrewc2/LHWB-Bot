import { Listener } from '@lhwb/framework';
import { Events } from 'discord.js';

export default class LoadBotBanned extends Listener {
  constructor() {
    super('loadBotBanned', {
      event: Events.ClientReady,
      emitter: 'client',
      category: 'permissions',
    });
  }

  async exec() {
    const bannedUsers = await this.client.database.botBanned.getBotBanned();
    await this.client.cache.botBanned.setAllBans(bannedUsers);
  }
}
