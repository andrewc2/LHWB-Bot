const { SlashCommand } = require('discord-akairo');
const { PermissionsBitField, EmbedBuilder, Colors } = require('discord.js');
const config = require('../../../config.json');

module.exports = class MerchAutoPostLeaveSlashCommand extends SlashCommand {
  constructor() {
    super('merchAutoPingLeave', {
      name: 'merch auto-ping leave',
      prefixId: 'merch',
      parentCommand: 'auto-ping',
      clientPermissions: [ PermissionsBitField.Flags.ManageRoles ],
      shortName: 'leave',
      category: 'merch',
      channel: 'guild',
      commandType: 'sub',
      description: 'Stop receiving pings for new merchandise on Taylor\'s store',
    });
  }

  exec(interaction) {
    const cantFindRole = new EmbedBuilder()
      .setDescription('I can\'t find the merch ping role. Please report this to a mod.')
      .setColor(Colors.Red);

    const dontHaveRole = new EmbedBuilder()
      .setDescription(`Sorry, I can't remove you from the new merch auto-ping because you haven't joined. You can join by using </merch auto-ping join:${interaction.commandId}>`)
      .setColor(Colors.Red);

    const roleRemoved = new EmbedBuilder()
      .setDescription(`You have been removed from new merch auto-pings. You can rejoin by using </merch auto-ping join:${interaction.commandId}>`)
      .setColor(Colors.Green);

    const error = new EmbedBuilder()
      .setDescription('An error occurred. Please report this to a mod, if this continues.')
      .setColor(Colors.Red);

    const role = interaction.guild.roles.cache.get(config.storeAutopost.role);
    if (!role) {
      return interaction.reply({ embeds: [cantFindRole], ephemeral: true });
    }

    if (!interaction.member.roles.cache.has(role.id)) {
      return interaction.reply({ embeds: [dontHaveRole] });
    }

    return interaction.member.roles.remove(role)
      .then(() => interaction.reply({ embeds: [roleRemoved] }))
      .catch(() => interaction.reply({ embeds: [error], ephemeral: true }));
  }
};
