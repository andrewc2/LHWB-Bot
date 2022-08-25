const { Listener } = require('discord-akairo');
const { Events } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class LoadGlobalCommandDisableListener extends Listener {
  constructor() {
    super('loadGlobalCommandDisable', {
      event: Events.ClientReady,
      emitter: 'client',
      category: 'permissions',
    });
  }

  async exec() {
    const [row] = await db.promise().query('SELECT * FROM `globalCommandDisable`');
    if (row.length === 0) return;
    row.forEach(entry => this.client.globalCommandDisable.set(entry['commandId'], entry['commandId']));
  }
};
