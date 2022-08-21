const { SlashCommand } = require('discord-akairo');
const { db } = require('../../../models/db');
const { EmbedBuilder, Colors, ApplicationCommandOptionType } = require('discord.js');
const { noVoiceServerAndMod, permissionType } = require('../../../utilities/permissions');

module.exports = class TrustedSetSlashCommand extends SlashCommand {
  constructor() {
    super('trustedSet', {
      name: 'trusted set',
      commandType: 'sub',
      category: 'permissions',
      parentCommand: 'trusted',
      shortName: 'set',
      prefixId: 'trustedSet',
      channel: 'guild',
      slashOptions: [
        {
          name: 'role',
          description: 'The role to set as trusted',
          type: ApplicationCommandOptionType.Role,
          required: true,
        },
      ],
    });
  }

  userPermissions(message) {
    return noVoiceServerAndMod(message);
  }

  async exec(interaction) {
    await interaction.deferReply();
    const role = interaction.options.getRole('role', true);

    db.query('SELECT * FROM permissions WHERE guild_id = ? AND permission_type = ?', [interaction.guild.id, permissionType.ROLE], function(err, row) {
      if (row.length !== 0) {
        const noRoleEmbed = new EmbedBuilder()
          .setDescription('The trusted role has already been set in this server. To clear the trusted role, use the `/trusted clear` command.')
          .setColor(Colors.Red);
        return interaction.editReply({ embeds: [noRoleEmbed] });
      }

      const embed = new EmbedBuilder()
        .setDescription(`Successfully set ${role} as the trusted role. To remove ${role} as the trusted role, use the \`/trusted clear\` command.`)
        .setColor(Colors.Blue);

      db.query('INSERT INTO permissions (guild_id, role_id, permission_type) VALUES (?,?,?)', [interaction.guild.id, role.id, permissionType.ROLE]);
      return interaction.editReply({ embeds: [embed] });
    });
  }
};
