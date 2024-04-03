import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType, EmbedBuilder, Colors } from 'discord.js';
import { findLastFmUser, searchLastFm } from '../../commandUtilities/lastFmUtilities.js';
import Utilities from '../../utilities/Utilities.js';

export default class LastFmCurrent extends Command {
  constructor() {
    super('lastFmCurrent', {
      name: 'lastfm current',
      category: 'lastfm',
      options: [
        {
          name: 'user',
          description: 'The user to receive scrobble information for',
          type: ApplicationCommandOptionType.User,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'lastfm',
        shortName: 'current',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser('user') ?? interaction.user;
    const embed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`Uh oh! Looks like ${user.username} has not set their last.fm username. They can set it by using the ${Utilities.getCommandMention(this.client, 'lastfm set')} command.`);

    const lastFmUsername = await findLastFmUser(user);
    if (!lastFmUsername) {
      return interaction.editReply({ embeds: [ embed ] });
    }
    return interaction.editReply(await searchLastFm(lastFmUsername, user));
  }
}
