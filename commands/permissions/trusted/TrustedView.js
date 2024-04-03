import Command from '../../../structure/commands/Command.js';
import { EmbedBuilder, Colors } from 'discord.js';
import { database } from '../../../models/database.js';
import { permissionType } from '../../../utilities/Permission.js';

export default class TrustedView extends Command {
  constructor() {
    super('trustedView', {
      name: 'trusted view',
      category: 'permissions',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'trusted',
        shortName: 'view',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    database.query('SELECT * FROM permissions WHERE guild_id = ? AND permission_type = ?', [interaction.guild.id, permissionType.ROLE], function(err, row) {
      if (row.length === 0) {
        const noRoleEmbed = new EmbedBuilder()
          .setDescription('The trusted role has not been set in this server. To set the trusted role, use the `/trusted set` command.')
          .setColor(Colors.Red);
        return interaction.editReply({ embeds: [noRoleEmbed] });
      }

      const embed = new EmbedBuilder()
        .setDescription(`The trusted role in this server is currently set to ${interaction.guild.roles.cache.get(row[0].role_id)}. To clear the trusted role, use the \`/trusted clear\` command.`)
        .setColor(Colors.Blue);

      return interaction.editReply({ embeds: [embed] });
    });
  }
}
