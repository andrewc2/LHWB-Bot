import Listener from '../../structure/listeners/Listener.js';
import { Events } from 'discord.js';
import { database } from '../../models/database.js';

export default class DeleteTrustedRoleOnRoleDelete extends Listener {
  constructor() {
    super('deleteTrustedRoleOnRoleDelete', {
      event: Events.GuildRoleDelete,
      emitter: 'client',
      category: 'permissions',
    });
  }

  exec(role) {
    database.query('DELETE FROM permissions WHERE role_id = ?', [role.id]);
  }
}
