import Listener from '../../structure/listeners/Listener.js';
import { Events, EmbedBuilder } from 'discord.js';

export default class MemberLeave extends Listener {
  constructor() {
    super('memberLeave', {
      emitter: 'client',
      category: 'client',
      event: Events.GuildMemberRemove,
    });
  }

  exec(member) {
    const embed = new EmbedBuilder()
      .setColor('#FF69B4');

    const joinDate = member.joinedAt;
    const now = new Date();
    const joinTime = (now.getTime() - joinDate.getTime()) / 1000;
    if (joinTime < 600 && member.guild.id === '689935210254696564') {
      if (!member.guild.systemChannelId) return;
      return member.guild.systemChannel.send({ embeds: [embed.setDescription(`${member.user.username} has already left us. <:osad:692120291798941887>`)] });
    }
  }
}