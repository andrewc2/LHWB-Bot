import Command from '../../../structure/commands/Command.js';
import { EmbedBuilder, Colors } from 'discord.js';
import { database } from '../../../models/database.js';
import { permissionType } from '../../../utilities/Permission.js';

export default class TrustedClear extends Command {
  constructor() {
    super('trustedClear', {
      name: 'trusted clear',
      category: 'permissions',
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'trusted',
        shortName: 'clear',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    database.query('SELECT * FROM permissions WHERE guild_id = ? AND permission_type = ?', [interaction.guild.id, permissionType.ROLE], function(err, row) {
      if (row.length === 0) {
        const noTrustedRole = new EmbedBuilder()
          .setDescription('There is no trusted role set in this server. To set a trusted role, use the `/trusted set` command.')
          .setColor(Colors.Red);
        return interaction.editReply({ embeds: [noTrustedRole] });
      }

      const embed = new EmbedBuilder()
        .setDescription('Successfully cleared the trusted role. To reset the trusted role, use the `/trusted set` command.')
        .setColor(Colors.Blue);

      database.query('DELETE FROM permissions WHERE guild_id = ? and permission_type = ?', [interaction.guild.id, permissionType.ROLE]);
      return interaction.editReply({ embeds: [embed] });
    });
  }
}
