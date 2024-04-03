import Listener from '../../structure/listeners/Listener.js';
import { Events } from 'discord.js';
import { database } from '../../models/database.js';

export default class LoadBotBanList extends Listener {
  constructor() {
    super('loadBotBanList', {
      event: Events.ClientReady,
      emitter: 'client',
      category: 'permissions',
    });
  }

  async exec() {
    const [row] = await database.promise().query('SELECT * FROM botBanList');
    if (row.length === 0) return;
    row.forEach(entry => this.client.botBanned.set(entry['entity'], entry['entity']));
  }
}
