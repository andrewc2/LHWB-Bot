const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { DateTime } = require('luxon');
const { db } = require('../../models/db');
const { pagination } = require('../../utilities/pagination');

module.exports = class CountdownSlashCommand extends SlashCommand {
  constructor() {
    super('countdown', {
      name: 'countdown',
      prefixId: 'countdown',
      category: 'other',
      commandType: 'command',
      description: 'Display the current event countdowns.',
    });
  }

  async exec(interaction, message) {
    await interaction.deferReply({ fetchReply: true });

    const allEvents = [], embeds = [];
    const [rows] = await db.promise().query('SELECT * FROM `countdown` WHERE enddate > ? ORDER BY `startdate`', [DateTime.local().setZone('America/New_York').toString()]);

    for (const event of rows.values()) {
      const startDate = DateTime.fromISO(event.startdate.toISOString()).setZone('America/New_York');
      const endTime = DateTime.fromISO(event.enddate.toISOString()).setZone('America/New_York');
      if (startDate > DateTime.local().setZone('America/New_York')) {
        const dateUntil = startDate.diff(DateTime.local().setZone('America/New_York')).toFormat('d \'Days\' h \'Hours\' m \'Minutes\' s \'Seconds');
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

    const perChunk = 3;
    const result = allEvents.reduce((all, one, i) => {
      const ch = Math.floor(i / perChunk);
      all[ch] = [].concat((all[ch] || []), one);
      return all;
    }, []);

    result.forEach((event, i) => {
      embeds.push(new EmbedBuilder()
        .setTitle(allEvents.length === 1 ? 'Countdown' : 'Countdowns')
        .setURL('https://www.taylorswift.com/events')
        .setDescription(event.join(''))
        .setFooter({ text: `Page ${i + 1}/${result.length}` })
        .setColor('#9979FF'),
      );
    });

    return await pagination(message, embeds, false);
  }
};
