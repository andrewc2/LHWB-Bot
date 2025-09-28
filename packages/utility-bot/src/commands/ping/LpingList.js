import { Command } from '@lhwb/framework';
import { DiscordUtil, EmbedFormatter } from '@lhwb/shared';

export default class LpingList extends Command {
  constructor() {
    super('lpingList', {
      name: 'lping list',
      description: "See a list of all the pinglist's in this server",
      category: 'ping',
    });
  }

  async exec(interaction) {
    const guildPinglists = await this.client.database.query(
      'SELECT `name` FROM pinglist WHERE guildId = ?',
      [interaction.guild.id],
    );

    const failedEmbed = EmbedFormatter.standardErrorEmbed().setDescription(
      `There are no pinglists in this server. You can create a pinglist by using the ${DiscordUtil.formatCommandAsMention('lping create', this.client)} command.`,
    );

    if (guildPinglists.length === 0) {
      return interaction.editReply({
        embeds: [failedEmbed],
      });
    }

    const pings = guildPinglists.map((x) => x.name).join('` | `');

    const response = EmbedFormatter.standardUserEmbed(
      interaction,
      interaction.user,
    )
      .setTitle('Assigned Pings')
      .setDescription(
        `Here are all the pinglists available in this server. Use the ${DiscordUtil.formatCommandAsMention('lping get', this.client)} command to join one.\n\n \`${pings}\``,
      );

    return interaction.editReply({ embeds: [response] });
  }
}
