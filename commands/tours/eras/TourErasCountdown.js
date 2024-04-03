import Command from '../../../structure/commands/Command.js';
import { EmbedBuilder, Colors } from 'discord.js';
import { DateTime } from 'luxon';
import { database } from '../../../models/database.js';
import Paginator from '../../../utilities/Paginator.js';

export default class TourErasCountdown extends Command {
  constructor() {
    super('tourErasCountdown', {
      name: 'tour eras countdown',
      category: 'tours',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'eras',
        shortName: 'tour-countdown',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply({ fetchReply: true });

    const currentDate = DateTime.local().setZone('America/New_York');

    const allEvents = [];
    const [rows] = await database.promise().query('SELECT * FROM `erasTourCountdowns` WHERE enddate > ? ORDER BY `startdate`', [currentDate.toString()]);

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

    const embedArray = Paginator.createEmbeds(allEvents, allEvents.length === 1 ? 'The Eras Tour Date' : 'The Eras Tour Dates', '#9979FF', null, null, null, null, 3);
    const paginator = new Paginator(interaction, embedArray, true);
    return await paginator.send();
  }
}
