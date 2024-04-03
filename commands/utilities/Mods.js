import Command from '../../structure/commands/Command.js';
import { Colors, EmbedBuilder } from 'discord.js';
import Logger from '../../utilities/Logger.js';
import Utilities from '../../utilities/Utilities.js';
const config = await Utilities.loadJSON('../config.json');

export default class Mods extends Command {
  constructor() {
    super('mods', {
      name: 'mods',
      description: 'Enables the mods ping in emergencies (unneeded pings could result in a timeout)',
      category: 'utilities',
      guildOnly: true,
      deploymentDetails: {
        commandType: 'command',
        musicServer: false,
        limited: true,
      },
    });
  }

  async exec(interaction) {
    const activeEmbed = new EmbedBuilder()
      .setDescription('This command can only be used by members who have joined more than 2 weeks ago.')
      .setColor(Colors.Red);

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

    const mods = interaction.guild.roles.cache.get(config.discord.mod_role_id);
    if (!mods) {
      return await interaction.reply({ embeds: [noRoleErrorEmbed], ephemeral: true });
    }

    const joinDate = interaction.member.joinedAt;
    const now = new Date();
    const joinTime = (now.getTime() - joinDate.getTime()) / 1000;
    if (joinTime < 60 * 60 * 24 * 14) {
      return await interaction.reply({ embeds: [activeEmbed], ephemeral: true });
    }

    if (!mods.editable) {
      return await interaction.reply({ embeds: [permissionsErrorEmbed], ephemeral: true });
    }

    await mods.setMentionable(true, `activated by ${interaction.user.username}`);
    Logger.info(`Mods tag activated by ${interaction.user.username}`);

    await interaction.reply({ embeds: [enabledEmbed] });

    setTimeout(function() {
      mods.setMentionable(false);
      Logger.info('Mods tag deactivated.');
    }, 120000);
  }
}
