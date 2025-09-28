import { Listener } from '@lhwb/framework';
import { EmbedFormatter } from '@lhwb/shared';
import { Events } from 'discord.js';

export default class MemberLeave extends Listener {
  constructor() {
    super('memberLeave', {
      emitter: 'client',
      category: 'client',
      event: Events.GuildMemberRemove,
    });
  }

  exec(member) {
    const embed = EmbedFormatter.plainEmbed('#FF69B4').setDescription(
      `${member.user.username} has already left us. <:osad:692120291798941887>`,
    );

    const joinDate = member.joinedAt;

    const now = new Date();
    const joinTime = (now.getTime() - joinDate.getTime()) / 1000;

    if (joinTime < 600 && member.guild.id === '689935210254696564') {
      if (!member.guild.systemChannelId) return;
      return member.guild.systemChannel.send({ embeds: [embed] });
    }
  }
}
