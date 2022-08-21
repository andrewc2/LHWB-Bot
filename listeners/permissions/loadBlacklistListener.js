const { Listener } = require('discord-akairo');
const { Events } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class LoadBlacklistListener extends Listener {
  constructor() {
    super('loadBlacklist', {
      event: Events.ClientReady,
      emitter: 'client',
      category: 'permissions',
    });
  }

  async exec() {
    const [row] = await db.promise().query('SELECT * FROM botban_list');
    if (row.length === 0) return;
    row.forEach(entry => this.client.blacklist.set(entry['entity'], entry['entity']));
  }
};
