import Command from '../../../structure/commands/Command.js';
import { ApplicationCommandOptionType, Colors, EmbedBuilder } from 'discord.js';
import { database } from '../../../models/database.js';
import { GET_HISTORY } from '../../../models/musicQueries.js';

export default class RecentUser extends Command {
  constructor() {
    super('recentUser', {
      name: 'recent user',
      category: 'music',
      options: [
        {
          name: 'user',
          type: ApplicationCommandOptionType.User,
          description: 'Shows the 10 most recently listened to songs',
          required: false,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'recent',
        shortName: 'user',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser('user') ?? interaction.user;

    const [row] = await database.promise().query(GET_HISTORY, [user.id, 10]);

    if (!row || row.length === 0) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${user.username} hasn't listened to any songs yet :pleading_face:`)
            .setColor(Colors.Red),
        ],
      });
    }

    const recentSongs = row.map((song, i) => `${i + 1}. ${song['official_name']} - ${song['artist_name']}`);

    const embed = new EmbedBuilder()
      .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ extension: 'png', size: 128 }) })
      .setTitle('Last 10 songs listened to on LHWB')
      .setDescription(`Recently Played:\n${recentSongs.join('\n')}`)
      .setURL(`https://lhwb.dev/listeninghistory.php?user=${user.id}`)
      .setColor('#FF69B4');

    return interaction.editReply({ embeds: [embed] });
  }
}
