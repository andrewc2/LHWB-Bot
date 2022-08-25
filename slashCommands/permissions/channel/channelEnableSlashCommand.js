const { SlashCommand } = require('discord-akairo');
const { db } = require('../../../models/db');
const { EmbedBuilder, Colors, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const { autocomplete } = require('../../../commandUtilities/channelUtilities');

module.exports = class ChannelEnableSlashCommand extends SlashCommand {
  constructor() {
    super('channelEnable', {
      name: 'channel enable',
      category: 'permissions',
      commandType: 'sub',
      parentCommand: 'channel',
      shortName: 'enable',
      prefixId: 'channelEnable',
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

    db.query('SELECT * FROM `command` WHERE `guildID` = ? AND `channelID` = ? AND `commandID` = ?', [guildID, channelID, commandID], function(err, result) {
      if (err) return;
      if (result.length < 1) {
        return interaction.editReply({ embeds: [failedEmbed.setDescription(`**${command.aliases[0]}** is not disabled. To disable a command, use the \`/channel disable\` command. :smiley:`)] });
      }
      else {
        db.query('DELETE FROM `command` WHERE `guildID` = ? AND `channelID` = ? AND `commandID` = ?', [guildID, channelID, commandID]);
        return interaction.editReply({ embeds: [embed.setDescription(`**${command.aliases[0]}** has been enabled. To disable a command, use the \`/channel disable\` command. :smiley:`)] });
      }
    });
  }

  autocomplete(interaction) {
    return autocomplete(interaction, this.client.messageCommandHandler);
  }
};
