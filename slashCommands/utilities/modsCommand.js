const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { logger } = require('../../utilities/winstonLogging');
const config = require('../../config.json');

module.exports = class ModsSlashCommand extends SlashCommand {
  constructor() {
    super('mods', {
      name: 'mods',
      commandType: 'command',
      prefixId: 'mods',
      channel: 'guild',
      slashLimitDeploy: true,
      description: 'Enables the mods ping in emergencies, unneeded pings could result in a timeout.',
      category: 'utilities',
    });
  }

  async exec(interaction) {
    const activeEmbed = new EmbedBuilder()
      .setDescription('This command can only be used by members who have joined more than 2 weeks ago.')
      .setColor(Colors.Blurple);

    const noRoleErrorEmbed = new EmbedBuilder()
      .setDescription('Error: I can\'t find the defined mods role.')
      .setColor(Colors.Red);

    const permissionsErrorEmbed = new EmbedBuilder()
      .setDescription('Error: I don\'t have permission to edit the mods role.')
      .setColor(Colors.Red);

    const enabledEmbed = new EmbedBuilder()
      .setDescription('The mods tag has activated. Do not continue if this is not a serious issue that needs attention and no mods are currently active.')
      .setFooter({ text: 'Otherwise, use the tag quickly, as it will be disabled in 2 minutes.' })
      .setColor(Colors.Blurple);

    const mods = interaction.guild.roles.cache.get(config.discord.modRoleId);
    if (!mods) {
      await interaction.reply({
        embeds: [noRoleErrorEmbed],
        ephemeral: true,
      });
      return;
    }

    const joinDate = interaction.member.joinedAt;
    const now = new Date();
    const joinTime = (now.getTime() - joinDate.getTime()) / 1000;
    if (joinTime < 60 * 60 * 24 * 14) {
      await interaction.reply({
        embeds: [activeEmbed],
        ephemeral: true,
      });
      return;
    }

    if (!mods.editable) {
      await interaction.reply({
        embeds: [permissionsErrorEmbed],
        ephemeral: true,
      });
      return;
    }

    mods.setMentionable(true, `activated by ${interaction.user.username}`);
    logger.log('warn', `Mods tag activated by ${interaction.user.username}`);

    await interaction.reply({ embeds: [enabledEmbed] });

    setTimeout(function() {
      mods.setMentionable(false);
      logger.log('warn', 'Mods tag deactivated.');
    }, 120000);
  }
};
