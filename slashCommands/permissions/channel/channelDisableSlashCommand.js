const { SlashCommand } = require('discord-akairo');
const { db } = require('../../../models/db');
const { EmbedBuilder, Colors, PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { autocomplete } = require('../../../commandUtilities/channelUtilities');

module.exports = class ChannelDisableSlashCommand extends SlashCommand {
  constructor() {
    super('channelDisable', {
      name: 'channel disable',
      commandType: 'sub',
      parentCommand: 'channel',
      shortName: 'disable',
      prefixId: 'channelDisable',
      channel: 'guild',
      userPermissions: [PermissionsBitField.Flags.ManageGuild],
      slashOptions: [
        {
          name: 'command',
          description: 'The command to enable',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
        },
      ],
    });
  }

  async exec(interaction) {
    await interaction.deferReply();
    const commandName = interaction.options.getString('command', true);
    const command = this.client.messageCommandHandler.modules.find(messageCommand => messageCommand.id === commandName);

    const failedEmbed = new EmbedBuilder()
      .setColor(Colors.Red);

    if (!command) {
      return interaction.editReply({
        embeds: [
          failedEmbed
            .setDescription(
              'Sorry, I couldn\'t find this command.',
            ),
        ],
      });
    }

    const embed = new EmbedBuilder()
      .setColor('#FF69B4');

    const guildID = interaction.guild.id;
    const channelID = interaction.channel.id;
    const commandID = command.id;
    const guardedCommands = ['channelDisable', 'channelEnable', 'channel'];

    if (guardedCommands.includes(commandID)) {
      return interaction.editReply({ embeds: [failedEmbed.setDescription(`**${commandName}** cannot be disabled as it is an essential command. :sob:`)] });
    }

    db.query('SELECT * FROM `command` WHERE `guildID` = ? AND `channelID` = ? AND `commandID` = ?', [guildID, channelID, commandID], function(err, result) {
      if (err) return;
      if (result.length > 0) {
        return interaction.editReply({ embeds: [failedEmbed.setDescription(`**${commandName}** is already disabled. To enable a command, use the \`/channel enable\` command. :sob:`)] });

      }
      else {
        db.query('INSERT INTO `command` (`guildID`, `channelID`, `commandID`) VALUES (?,?,?)', [guildID, channelID, commandID]);
        return interaction.editReply({ embeds: [embed.setDescription(`**${commandName}** has been disabled. To re-enable a command, use the \`/channel enable\` command. :sob:`)] });
      }
    });
  }

  autocomplete(interaction) {
    return autocomplete(interaction, this.client.messageCommandHandler);
  }
};
