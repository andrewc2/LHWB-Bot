const { SlashCommand } = require('discord-akairo');
const { PermissionsBitField, EmbedBuilder, Colors } = require('discord.js');
const config = require('../../../config.json');

module.exports = class MerchAutoPingJoinSlashCommand extends SlashCommand {
  constructor() {
    super('MerchAutoPingJoin', {
      name: 'merch auto-ping join',
      prefixId: 'merch',
      parentCommand: 'auto-ping',
      clientPermissions: [ PermissionsBitField.Flags.ManageRoles ],
      shortName: 'join',
      category: 'merch',
      channel: 'guild',
      commandType: 'sub',
      description: 'Get pings for new merchandise on Taylor\'s store',
    });
  }

  exec(interaction) {
    const cantFindRole = new EmbedBuilder()
      .setDescription('I can\'t find the merch ping role. Please report this to a mod.')
      .setColor(Colors.Red);

    const alreadyHaveRole = new EmbedBuilder()
      .setDescription(`You're already recieving pings for new Taylor merch! You can leave by using </merch auto-ping leave:${interaction.commandId}>`)
      .setColor(Colors.Red);

    const roleAdded = new EmbedBuilder()
      .setDescription(`You will now recieve pings for new Taylor merch. You can leave by using </merch auto-ping leave:${interaction.commandId}>`)
      .setColor(Colors.Green);

    const error = new EmbedBuilder()
      .setDescription('An error occurred. Please report this to a mod, if this continues.')
      .setColor(Colors.Red);

    const role = interaction.guild.roles.cache.get(config.storeAutopost.role);
    if (!role) {
      return interaction.reply({ embeds: [cantFindRole], ephemeral: true });
    }

    if (interaction.member.roles.cache.has(role.id)) {
      return interaction.reply({ embeds: [alreadyHaveRole] });
    }

    return interaction.member.roles.add(role)
      .then(() => interaction.reply({ embeds: [roleAdded] }))
      .catch(() => interaction.reply({ embeds: [error], ephemeral: true }));
  }
};
