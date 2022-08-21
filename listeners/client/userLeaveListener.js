const { Listener } = require('discord-akairo');
const { Events, EmbedBuilder } = require('discord.js');

module.exports = class memberLeaveListener extends Listener {
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
    if (joinTime < 600 && member.guild.id !== '115332333745340416') {
      if (!member.guild.systemChannelId) return;
      member.guild.systemChannel.send({ embeds: [embed.setDescription(`${member.user.username} has already left us. <:osad:692120291798941887>`)] });
    }
  }
};
