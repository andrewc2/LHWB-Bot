import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType, Colors, time } from 'discord.js';
import { database } from '../../models/database.js';
import Paginator from '../../utilities/Paginator.js';
import { DateTime } from 'luxon';

export default class AwardView extends Command {
  constructor() {
    super('awardView', {
      name: 'award view',
      category: 'awards',
      options: [
        {
          name: 'user',
          description: 'The user whose awards to view',
          type: ApplicationCommandOptionType.User,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'award',
        shortName: 'view',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply({ fetchReply: true });
    const user = interaction.options.getUser('user') ?? interaction.user;

    const [row] = await database.promise().query('SELECT * FROM userAwards WHERE userId = ? AND guildId = ?', [user.id, interaction.guildId]);
    const awards = row.map((award, i) => {
      const date = DateTime.fromISO(award.date.toISOString())
        .setZone('America/New_York')
        .toSeconds();
      return `${i + 1}. ${award.description} (${time(date, 'D')})\n`;
    });

    const embedArray = Paginator.createEmbeds(awards, `:medal: Awards for ${user.displayName}`, Colors.Gold, null, null, null, null, 10);
    const paginator = new Paginator(interaction, embedArray, false, 'This member has no awards! Participate in server events for a chance to win an award.');
    return await paginator.send();
  }
}
