const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');
const { findLastFmUser, searchLastFm } = require('../../commandUtilities/lastFmUtilities');

module.exports = class LastFmCurrentSlashCommand extends SlashCommand {
  constructor() {
    super('lastFmCurrent', {
      name: 'lastfm current',
      prefixId: 'lastFm',
      category: 'lastfm',
      commandType: 'sub',
      parentCommand: 'lastfm',
      shortName: 'current',
      slashOptions: [
        {
          name: 'user',
          description: 'The user to receive scrobble information for',
          type: ApplicationCommandOptionType.User,
        },
      ],
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser('user') ?? interaction.user;
    const embed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription('Uh oh! Looks like you or that user has not saved your/their last.fm username. You/They can set it by using the `/lastfm set` command.');

    const lastFmUsername = await findLastFmUser(user);
    if (!lastFmUsername) {
      return interaction.editReply({ embeds: [ embed ] });
    }
    return interaction.editReply(await searchLastFm(lastFmUsername, user));
  }
};
