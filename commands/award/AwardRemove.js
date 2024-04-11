import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType, Colors, EmbedBuilder, escapeMarkdown, PermissionFlagsBits } from 'discord.js';
import { database } from '../../models/database.js';
import Paginator from '../../utilities/Paginator.js';

export default class AwardRemove extends Command {
  constructor() {
    super('awardRemove', {
      name: 'award remove',
      category: 'awards',
      userPermissions: [PermissionFlagsBits.ModerateMembers],
      options: [
        {
          name: 'user',
          description: 'The user to remove an award from',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'award-id',
          description: 'The id of the award to remove (leave blank to view the IDs of a users awards)',
          type: ApplicationCommandOptionType.Integer,
          min_value: 0,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'award',
        shortName: 'remove',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply({ fetchReply: true, ephemeral: true });
    const user = interaction.options.getUser('user', true);
    const awardId = interaction.options.getInteger('award-id', false);

    if (!awardId) {
      const [row] = await database.promise().query('SELECT * FROM userAwards WHERE userId = ? AND guildId = ?', [user.id, interaction.guildId]);
      const awards = row.map((award) => `**ID:** ${award.id} **Award:** ${escapeMarkdown(award.description)}`);
      const embedArray = Paginator.createEmbeds(awards, `Awards for ${user.displayName}`, Colors.Gold, null, '', null, null, 10);
      const paginator = new Paginator(interaction, embedArray, false);
      return await paginator.send();
    }

    const [row] = await database.promise().query('SELECT * FROM userAwards WHERE userId = ? AND guildId = ? AND id = ?', [user.id, interaction.guildId, awardId]);

    if (row.length === 0) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${user.username} does not have an award with this ID. To view all of a users awards, along with their award IDs, use this command without the \`award-id\` option.`)
            .setColor(Colors.Red),
        ],
      });
    }

    database.query('DELETE FROM userAwards WHERE id = ?', [awardId]);
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setDescription('The award has been removed successfully.')
          .setColor(Colors.Green),
      ],
    });
  }
}
