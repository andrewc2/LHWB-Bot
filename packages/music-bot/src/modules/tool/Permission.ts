import { FrameworkClient } from '@lhwb/framework';
import { Permission as SharedPermission } from '@lhwb/shared';
import { ChatInputCommandInteraction, GuildMember } from 'discord.js';

import Utilities from './Utilities.js';

export default class Permission {
  static async musicPermissionsCheck(
    client: FrameworkClient,
    interaction: ChatInputCommandInteraction,
  ) {
    const member = interaction.member as GuildMember;

    if (SharedPermission.isMod(member)) return null;
    if (!this.memberIsInVoiceChannel(client, interaction))
      return 'VoiceChannel';
    return null;
  }

  static async musicTrustedPermissionsCheck(
    client: FrameworkClient,
    interaction: ChatInputCommandInteraction,
  ) {
    const member = interaction.member as GuildMember;

    if (SharedPermission.isMod(member)) return null;
    if (!(await SharedPermission.isTrustedMember(client.database, member)))
      return 'TrustedRole';
    if (!this.memberIsInVoiceChannel(client, interaction))
      return 'VoiceChannel';
    return null;
  }

  static memberIsInVoiceChannel(
    client: FrameworkClient,
    interaction: ChatInputCommandInteraction,
  ) {
    const server = Utilities.getMusicServer(client, interaction.guildId!)!;
    const channel = (
      server.isInStageChannel()
        ? server.getStageChannel()
        : server.getVoiceChannel()
    )!;
    const memberChannel = (interaction.member as GuildMember).voice.channel;
    if (!memberChannel) return false;
    return memberChannel.id === channel.id;
  }
}
