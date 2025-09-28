import { Command } from '@lhwb/framework';
import { Paginator } from '@lhwb/shared';
import { ApplicationCommandOptionType, Colors, time } from 'discord.js';
import { DateTime } from 'luxon';

export default class AwardView extends Command {
  constructor() {
    super('awardView', {
      name: 'award view',
      description: 'View a members awards',
      category: 'awards',
      options: [
        {
          name: 'user',
          description: 'The user whose awards to view (defaults to you)',
          type: ApplicationCommandOptionType.User,
        },
      ],
    });
  }

  async exec(interaction) {
    const user = interaction.options.getUser('user') ?? interaction.user;

    const awards = (
      await this.client.database.query(
        'SELECT * FROM userAward WHERE userId = ? AND guildId = ?',
        [user.id, interaction.guildId],
      )
    ).map((award, i) => {
      const date = DateTime.fromISO(award.date.toISOString())
        .setZone('America/New_York')
        .toSeconds();

      return `${i + 1}. ${award.description} (${time(date, 'D')})\n`;
    });

    const embedArray = Paginator.createEmbeds(
      awards,
      `:medal: Awards for ${user.displayName}`,
      Colors.Gold,
      null,
      null,
      null,
      null,
      10,
    );

    const paginator = new Paginator(
      interaction,
      embedArray,
      this.client.logger,
      false,
      'This member has no awards! Participate in server events for a chance to win an award.',
    );

    return await paginator.send();
  }
}
