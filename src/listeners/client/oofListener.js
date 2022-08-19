const { Listener } = require('discord-akairo');
const { Events } = require('discord.js');
const { db } = require('../../models/db');
const config = require('../../../config.json');

module.exports = class OofListener extends Listener {
  constructor() {
    super('oofListener', {
      emitter: 'client',
      category: 'client',
      event: Events.MessageCreate,
    });
  }

  exec(message) {
    // If Patootie's message contains the word oof at least once, and it is not in #bots, the counter will increment by one.
    if (message.content.match(/oof/i) && message.author.id === config.discord.patootie.patootie_id && !config.discord.patootie.ignore_channels.includes(message.channel.id) && config.discord.patootie.guild_id === message.guild.id) {
      db.query('UPDATE counters SET counter = counter + 1, lastUsed = CURRENT_TIMESTAMP WHERE word = \'oof\' AND userID = ?', [config.discord.patootie.patootie_id]);
    }
  }
};
