import Command from '../../structure/commands/Command.js';
import { database } from '../../models/database.js';
import { RANK_PLAYS } from '../../models/musicQueries.js';
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';

export default class RankPlay extends Command {
  constructor() {
    super('rankPlay', {
      name: 'rank-play',
      description: 'Shows a ranking of the most played songs',
      guildOnly: true,
      category: 'music',
      options: [
        {
          name: 'limit',
          description: 'The number to limit the rank at',
          type: ApplicationCommandOptionType.Integer,
          min_value: 5,
          max_value: 25,
        },
      ],
      deploymentDetails: {
        commandType: 'command',
        musicServer: true,
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const limit = interaction.options.getInteger('limit') ?? 5;

    const [rows] = await database.promise().query(RANK_PLAYS, [limit]);
    const rankedPlays = rows.map(
      (row, i = 0) =>
        `${i + 1}. ${row['official_name']} - ${row['play_count']}`,
    );

    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setTitle('Ranked Plays:')
      .setDescription(rankedPlays.join('\n'))
      .setURL('https://lhwb.dev/recent.php');

    return interaction.editReply({ embeds: [embed] });
  }
}
