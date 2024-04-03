import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType, EmbedBuilder, Colors, PermissionsBitField } from 'discord.js';
import { database } from '../../models/database.js';
import { joinPinglistButton } from '../../commandUtilities/lpingUtilities.js';
import Utilities from '../../utilities/Utilities.js';

export default class LpingCreate extends Command {
  constructor() {
    super('lpingCreate', {
      name: 'lping create',
      category: 'ping',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
      options: [
        {
          name: 'pinglist',
          description: 'The name of the pinglist to be created',
          type: ApplicationCommandOptionType.String,
          required: true,
          max_length: 40,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'lping',
        shortName: 'create',
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
      .setDescription(`Uh oh! Looks like this pinglist already exists with this name. You can view available pinglists in this server by using the ${Utilities.getCommandMention(this.client, 'lping list')} command.`);

    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setDescription(`Successfully created the **${pinglist}** pinglist.`);

    database.query('SELECT * FROM pinglist WHERE `name` = ? AND `guildID` = ?', [pinglist, interaction.guild.id], function(err, result) {
      if (err) return;
      if (result.find(ping => ping.name === pinglist)) return interaction.editReply({ embeds: [failedEmbed] });
      database.query('INSERT INTO pinglist (`name`, `guildID`) VALUES (?,?)', [pinglist, interaction.guild.id]);
      return interaction.editReply({ embeds: [embed], components: [joinPinglistButton(pinglist)] });
    });
  }
}
