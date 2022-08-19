const { Listener } = require('discord-akairo');
const { Events } = require('discord.js');
const { db } = require('../../models/db');

module.exports = class DeleteTrustedRoleOnRoleDeleteListener extends Listener {
  constructor() {
    super('deleteTrustedRoleOnRoleDelete', {
      event: Events.GuildRoleDelete,
      emitter: 'client',
      category: 'permissions',
    });
  }

  exec(role) {
    db.query('DELETE FROM permissions WHERE role_id = ?', [role.id]);
  }
};
