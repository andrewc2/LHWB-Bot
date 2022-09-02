const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');
const { isMusicServer } = require('../../../utilities/permissions');
const { db } = require('../../../models/db');
const { GET_HISTORY } = require('../../../models/musicQueries');

module.exports = class RecentUserSlashCommand extends SlashCommand {
  constructor() {
    super('recentUser', {
      name: 'recent user',
      prefixId: 'recent',
      category: 'music',
      channel: 'guild',
      commandType: 'sub',
      parentCommand: 'recent',
      shortName: 'user',
      slashOptions: [
        {
          name: 'user',
          type: ApplicationCommandOptionType.User,
          description: 'Shows the 10 most recently listened to songs',
          required: false,
        },
      ],
    });
  }

  userPermissions(message) {
    return isMusicServer(message);
  }

  async exec(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser('user') ?? interaction.user;
    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setURL(`https://lhwb.dev/listeninghistory.php?user=${user.id}`);

    db.query(GET_HISTORY, [user.id, 10], function(err, results) {
      if (!results || results.length === 0) {
        embed.setDescription(`${user.tag} hasn't listened to any songs yet :pleading_face:`)
          .setURL(null)
          .setColor(Colors.Red);
        return interaction.editReply({ embeds: [embed] });
      }

      const recentSongs = results.map((result, i) => `${i + 1}. ${result['official_name']} - ${result['artist_name']}`);
      embed
        .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ extension: 'png', size: 128 }) })
        .setTitle('Last 10 songs listened to on LHWB')
        .setDescription(`Recently Played:\n${recentSongs.join('\n')}`);
      return interaction.editReply({ embeds: [embed] });
    });
  }
};