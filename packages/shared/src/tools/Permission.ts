import { GuildMember, PermissionsBitField } from 'discord.js';

import { MySQLDriver } from '../database/MySQLDriver';

const modRole = PermissionsBitField.Flags.ModerateMembers;

export class Permission {
  static isMod(member: GuildMember) {
    return member.permissions.has(modRole);
  }

  static async isTrustedMember(
    database: MySQLDriver,
    member: GuildMember,
  ): Promise<boolean> {
    const role = await database.guild.getGuildTrustedRole(member.guild.id);
    if (!role) return false;
    return member.roles.cache.has(role);
  }
}
