import { PermissionsBitField } from 'discord.js';
import { database } from '../models/database.js';
import Utilities from './Utilities.js';

const GET_PERMISSION = 'SELECT * FROM permissions WHERE guild_id = ? AND permission_type = ?';

export const permissionType = {
  ROLE: 'role',
  CHANNEL: 'channel',
};

const modRole = PermissionsBitField.Flags.ModerateMembers;

export default class Permission {
  static async musicPermissionsCheck(client, interaction) {
    if (this.isMod(interaction.member)) return null;
    if (!this.memberIsInVoiceChannel(client, interaction)) return 'VoiceChannel';
    if (!(await this.isSpamChannel(interaction.channel))) return 'SpamChannel';
    return null;
  }

  static async musicTrustedPermissionsCheck(client, interaction) {
    if (this.isMod(interaction.member)) return null;
    if (!(await this.isTrustedMember(interaction.member))) return 'TrustedRole';
    if (!this.memberIsInVoiceChannel(client, interaction)) return 'VoiceChannel';
    if (!(await this.isSpamChannel(interaction.channel))) return 'SpamChannel';
    return null;
  }

  static isMod(member) {
    return !!member.permissions.has(modRole);
  }

  static memberIsInVoiceChannel(client, interaction) {
    const server = Utilities.getVoiceServer(client, interaction.guildId);
    const channel = server.isInStageChannel() ? server.getStageChannel() : server.getVoiceChannel();
    const memberChannel = interaction.member.voice.channel;
    if (!memberChannel) return false;
    return memberChannel.id === channel.id;
  }

  static async isTrustedMember(member) {
    const [result] = await database.promise().query(GET_PERMISSION, [member.guild.id, permissionType.ROLE]);
    if (result.length === 0) return false;
    return member.roles.cache.has(result[0]['role_id']);
  }

  static async isSpamChannel(channel) {
    const [result] = await database.promise().query(GET_PERMISSION, [channel.guild.id, permissionType.CHANNEL]);
    return !!result.map(x => x.channel_id).includes(channel.id);
  }
}
