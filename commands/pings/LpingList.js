import Command from '../../structure/commands/Command.js';
import { EmbedBuilder, Colors } from 'discord.js';
import { database } from '../../models/database.js';
import Utilities from '../../utilities/Utilities.js';

export default class LpingList extends Command {
  constructor() {
    super('lpingList', {
      name: 'lping list',
      category: 'ping',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'lping',
        shortName: 'list',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const client = this.client;

    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setDescription(`There are no pinglists in this server. You can create a pinglist by using the ${Utilities.getCommandMention(this.client, 'lping create')} command.`);

    const embed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setTitle('Server Pinglists');

    database.query('SELECT `name` FROM pinglist WHERE guildID = ?', [interaction.guild.id], function(err, result) {
      if (err) return;
      if (result.length < 1) return interaction.editReply({ embeds: [failedEmbed] });
      const pings = result.map(x => x.name);
      return interaction.editReply({ embeds: [embed.setDescription(`Here are all the pinglists available in this server. Use the ${Utilities.getCommandMention(client, 'lping get')} command to join one.\n\n \`${pings.join('` | `')}\``)] });
    });
  }
}
