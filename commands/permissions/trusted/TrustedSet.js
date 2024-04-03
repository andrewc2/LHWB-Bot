import Command from '../../../structure/commands/Command.js';
import { EmbedBuilder, Colors, ApplicationCommandOptionType } from 'discord.js';
import { database } from '../../../models/database.js';
import { permissionType } from '../../../utilities/Permission.js';

export default class TrustedSet extends Command {
  constructor() {
    super('trustedSet', {
      name: 'trusted set',
      category: 'permissions',
      options: [
        {
          name: 'role',
          description: 'The role to set as trusted',
          type: ApplicationCommandOptionType.Role,
          required: true,
        },
      ],
      deploymentDetails: {
        commandType: 'sub',
        parentCommand: 'trusted',
        shortName: 'set',
      },
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const role = interaction.options.getRole('role', true);

    database.query('SELECT * FROM permissions WHERE guild_id = ? AND permission_type = ?', [interaction.guild.id, permissionType.ROLE], function(err, row) {
      if (row.length !== 0) {
        const noRoleEmbed = new EmbedBuilder()
          .setDescription('The trusted role has already been set in this server. To clear the trusted role, use the `/trusted clear` command.')
          .setColor(Colors.Red);
        return interaction.editReply({ embeds: [noRoleEmbed] });
      }

      const embed = new EmbedBuilder()
        .setDescription(`Successfully set ${role} as the trusted role. To remove ${role} as the trusted role, use the \`/trusted clear\` command.`)
        .setColor(Colors.Blue);

      database.query('INSERT INTO permissions (guild_id, role_id, permission_type) VALUES (?,?,?)', [interaction.guild.id, role.id, permissionType.ROLE]);
      return interaction.editReply({ embeds: [embed] });
    });
  }
}
