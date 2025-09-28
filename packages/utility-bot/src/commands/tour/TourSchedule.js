import { Command } from '@lhwb/framework';
import { EmbedFormatter, Paginator } from '@lhwb/shared';
import { DateTime } from 'luxon';

const TIME_ZONE = 'America/New_York';

export default class TourSchedule extends Command {
  constructor() {
    super('tourSchedule', {
      name: 'tour schedule',
      description: 'Displays a schedule for upcoming Taylor Swift shows',
      category: 'tours',
    });
  }

  async exec(interaction) {
    const currentDate = DateTime.local().setZone(TIME_ZONE);

    const events = await this.client.database.query(
      'SELECT * FROM `tourSchedule` WHERE endDate > ? ORDER BY `startDate`',
      [currentDate.toString()],
    );

    const allEvents = events.map((event) => {
      const startDate = DateTime.fromISO(event.startDate.toISOString()).setZone(
        TIME_ZONE,
      );
      const endDate = DateTime.fromISO(event.endDate.toISOString()).setZone(
        TIME_ZONE,
      );

      const countdown =
        startDate > currentDate
          ? `${startDate.diff(currentDate).toFormat("d 'Days' h 'Hours' m 'Minutes' s 'Seconds")}\n\n`
          : '';

      return `${event.name} - <t:${startDate.toSeconds()}> - <t:${endDate.toSeconds()}:t> (Local)\n${countdown}`;
    });

    if (!allEvents.length) {
      return interaction.editReply({
        embeds: [
          EmbedFormatter.standardErrorEmbed().setDescription(
            'There are no shows scheduled at the moment. :sob:',
          ),
        ],
      });
    }

    const embedArray = Paginator.createEmbeds(
      allEvents,
      'Tour Schedule',
      '#9979FF',
      null,
      null,
      null,
      null,
      3,
    );

    const paginator = new Paginator(
      interaction,
      embedArray,
      this.client.logger,
      true,
    );

    return await paginator.send();
  }
}
