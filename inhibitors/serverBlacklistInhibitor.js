const { Inhibitor } = require('discord-akairo');

module.exports = class GuildBlacklistInhibitor extends Inhibitor {
  constructor() {
    super('guildBlacklist', {
      reason: 'botBannedInServer',
    });
  }

  async exec(message) {
    if (message.guild) {
      return this.client.blacklist.has(message.guild.id);
    }
  }
};
