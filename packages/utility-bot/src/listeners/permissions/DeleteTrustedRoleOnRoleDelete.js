import { Listener } from '@lhwb/framework';
import { Events } from 'discord.js';

export default class DeleteTrustedRoleOnRoleDelete extends Listener {
  constructor() {
    super('deleteTrustedRoleOnRoleDelete', {
      event: Events.GuildRoleDelete,
      emitter: 'client',
      category: 'permissions',
    });
  }

  async exec(role) {
    await this.client.database.guild.clearGuildTrustedRoleByRoleId(role.id);
  }
}
