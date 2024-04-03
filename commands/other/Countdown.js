import Command from '../../structure/commands/Command.js';
import { EmbedBuilder, Colors } from 'discord.js';
import { DateTime } from 'luxon';
import { database } from '../../models/database.js';
import Paginator from '../../utilities/Paginator.js';

export default class Countdown extends Command {
  constructor() {
    super('countdown', {
      name: 'countdown',
      category: 'other',
      description: 'Display the current event countdowns',
      deploymentDetails: {
        commandType: 'command',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply({ fetchReply: true });

    const currentDate = DateTime.local().setZone('America/New_York');

    const allEvents = [];
    const [rows] = await database.promise().query('SELECT * FROM `countdown` WHERE enddate > ? ORDER BY `startdate`', [currentDate.toString()]);

    for (const event of rows.values()) {
      const startDate = DateTime.fromISO(event.startdate.toISOString()).setZone('America/New_York');
      const endTime = DateTime.fromISO(event.enddate.toISOString()).setZone('America/New_York');
      if (startDate > currentDate) {
        const dateUntil = startDate.diff(currentDate).toFormat('d \'Days\' h \'Hours\' m \'Minutes\' s \'Seconds');
        allEvents.push(`${event.name} - <t:${startDate.toSeconds()}> - <t:${endTime.toSeconds()}:t> (Local)\n${dateUntil}\n\n`);
      }
      else {
        allEvents.push(`${event.name} - <t:${startDate.toSeconds()}> - <t:${endTime.toSeconds()}:t>\n\n`);
      }
    }

    if (allEvents.length < 1) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription('There are no events scheduled. :sob:')
            .setColor(Colors.Red),
        ],
      });
    }

    const embeds = Paginator.createEmbeds(allEvents, allEvents.length === 1 ? 'Countdown' : 'Countdowns', '#9979FF', null, null, null, null, 3);
    const pagination = new Paginator(interaction, embeds, false);
    return await pagination.send();
  }
}
