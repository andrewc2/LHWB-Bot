const { Listener } = require('discord-akairo');
const { Events } = require('discord.js');
const config = require('../../config.json');
// 3 hours
const activeLength = 10800000;

module.exports = class ActiveRoleListener extends Listener {
  constructor() {
    super('activeRole', {
      emitter: 'client',
      category: 'client',
      event: Events.MessageCreate,
    });
  }

  exec(message) {
    if (message.channel.guild.id === config.slashConfig.limited_guilds[0] && !hasRole(message.member, message.channel.guild)) {
      const joinDate = message.member.joinedAt;
      const now = new Date();
      const joinTime = now.getTime() - joinDate.getTime();
      if (joinTime > activeLength) {
        const role = message.channel.guild.roles.cache.get(config.discord.defaultRoleId);
        message.member.roles
          .add(role)
          .catch(() => console.log('Incorrect perms to add active role'));
      }
    }

    function hasRole(member, guild) {
      const role = guild.roles.cache.get(config.discord.defaultRoleId);
      if (role === null) {
        return false;
      }
      return member.roles.cache.some((memberRole) => memberRole.id === role.id);
    }
  }
};