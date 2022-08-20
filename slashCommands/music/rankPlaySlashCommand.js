const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { isMusicServer } = require('../../utilities/permissions');
const { db } = require('../../models/db');
const { RANK_PLAYS } = require('../../models/musicQueries');

module.exports = class RankPlaySlashCommand extends SlashCommand {
  constructor() {
    super('rankPlay', {
      name: 'rank-play',
      prefixId: 'rankPlay',
      category: 'music',
      channel: 'guild',
      commandType: 'command',
      description: 'Shows a ranking of the most played songs',
      slashOptions: [{
        name: 'limit',
        description: 'The number to limit the rank at',
        type: ApplicationCommandOptionType.Integer,
        min_value: 5,
        max_value: 25,
      }],
    });
  }

  userPermissions(message) {
    return isMusicServer(message);
  }

  async exec(interaction) {
    await interaction.deferReply();
    const limit = interaction.options.getInteger('limit') ?? 5;

    db.query(RANK_PLAYS, [limit], function(err, result) {
      const rankedPlays = result.map(
        (x, i = 0) =>
          `${i + 1}. ${x['official_name']} - ${x['play_count']}`,
      );

      const embed = new EmbedBuilder()
        .setColor('#FF69B4')
        .setTitle('Ranked Plays:')
        .setDescription(rankedPlays.join('\n'))
        .setURL('https://lhwb.dev/recent.php');

      return interaction.editReply({ embeds: [embed] });
    });
  }
};
