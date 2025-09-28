import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';

export default class LpingJoined extends Command {
  constructor() {
    super('lpingJoined', {
      name: 'lping joined',
      description: "See a list of pinglist's you've joined",
      category: 'ping',
    });
  }

  async exec(interaction) {
    const pings = await this.client.database.query(
      'SELECT u.userId, p.id, p.name FROM user as u INNER JOIN userPinglist as up ON u.userId = up.userId INNER JOIN pinglist as p ON p.id = up.pinglistId WHERE p.guildId = ? AND up.userId = ?',
      [interaction.guild.id, interaction.user.id],
    );

    const failedEmbed = EmbedFormatter.standardErrorEmbed().setDescription(
      `Uh oh! Looks like you've not joined any pinglist's in this server. You can view available pinglists in this server by using the ${DiscordUtil.formatCommandAsMention('lping list', this.client)} command.`,
    );

    if (pings.length === 0) {
      return interaction.editReply({ embeds: [failedEmbed] });
    }

    const formattedPings = pings.map((i) => i.name);

    const response = EmbedFormatter.standardUserEmbed(
      interaction,
      interaction.user,
    )
      .setTitle('Assigned Pings')
      .setDescription(`\`${formattedPings.join('` | `')}\``);

    return interaction.editReply({ embeds: [response] });
  }
}
