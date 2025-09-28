import { Command } from '@lhwb/framework';
import { EmbedFormatter, Paginator } from '@lhwb/shared';
import { DateTime } from 'luxon';

const TIME_ZONE = 'America/New_York';

export default class Countdown extends Command {
  constructor() {
    super('countdown', {
      name: 'countdown',
      description: 'Display the current event countdowns',
      category: 'other',
    });
  }

  async exec(interaction) {
    const currentDate = DateTime.local().setZone(TIME_ZONE);

    const events = await this.client.database.query(
      'SELECT * FROM `countdown` WHERE endDate > ? ORDER BY `startDate`',
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
            'There are no events scheduled. :sob:',
          ),
        ],
      });
    }

    const embeds = Paginator.createEmbeds(
      allEvents,
      allEvents.length === 1 ? 'Countdown' : 'Countdowns',
      '#9979FF',
      null,
      null,
      null,
      null,
      3,
    );

    const pagination = new Paginator(
      interaction,
      embeds,
      this.client.logger,
      false,
    );

    return await pagination.send();
  }
}
