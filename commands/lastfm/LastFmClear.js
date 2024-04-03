import Command from '../../structure/commands/Command.js';
import { EmbedBuilder, Colors } from 'discord.js';
import { database } from '../../models/database.js';
import { findLastFmUser } from '../../commandUtilities/lastFmUtilities.js';
import Utilities from '../../utilities/Utilities.js';

export default class LastFmClear extends Command {
  constructor() {
    super('lastFmClear', {
      name: 'lastfm clear',
      category: 'lastfm',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'lastfm',
        shortName: 'clear',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const embed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`You currently don't have a lastfm username set. You can set your username by using the ${Utilities.getCommandMention(this.client, 'lastfm set')} command.`);

    const lastFmUsername = await findLastFmUser(interaction.user);
    if (!lastFmUsername) {
      return interaction.editReply({ embeds: [embed] });
    }
    else {
      database.query('DELETE FROM lastfm WHERE discordID = ?', [interaction.user.id]);
      embed
        .setColor('#FF69B4')
        .setDescription('Your last.fm username has been successfully cleared!');
      return interaction.editReply({ embeds: [embed] });
    }
  }
}
