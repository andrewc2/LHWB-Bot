const { Inhibitor } = require('discord-akairo');

module.exports = class UserBlacklistInhibitor extends Inhibitor {
  constructor() {
    super('userBlacklist', {
      reason: 'botBanned',
    });
  }

  async exec(message) {
    return this.client.blacklist.has(message.author.id);
  }
};
