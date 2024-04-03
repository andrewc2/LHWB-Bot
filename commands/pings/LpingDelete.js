import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType, EmbedBuilder, Colors, PermissionsBitField } from 'discord.js';
import { database } from '../../models/database.js';
import Utilities from '../../utilities/Utilities.js';

export default class LpingDelete extends Command {
  constructor() {
    super('lpingDelete', {
      name: 'lping delete',
      category: 'ping',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
      options: [
        {
          name: 'pinglist',
          description: 'The pinglist to delete',
          type: ApplicationCommandOptionType.String,
          required: true,
          max_length: 40,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'lping',
        shortName: 'delete',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const pinglist = interaction.options.getString('pinglist', true)
      .replace(/\s/g, '')
      .toLowerCase();

    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`I couldn't find a pinglist with the name ${pinglist}. You can view available pinglists in this server by using the ${Utilities.getCommandMention(this.client, 'lping list')} command.`);

    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setDescription(`Successfully deleted the **${pinglist}** pinglist.`);

    database.query('SELECT * FROM pinglist WHERE `name` = ? AND `guildID` = ?', [pinglist, interaction.guild.id], function(err, result) {
      if (err) return;
      if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed] });
      database.query('DELETE FROM pinglist WHERE name = ? AND guildID = ?', [pinglist, interaction.guild.id]);
      return interaction.editReply({ embeds: [embed] });
    });
  }
}
