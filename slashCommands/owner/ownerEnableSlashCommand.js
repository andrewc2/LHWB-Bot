const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');
const { autocomplete } = require('../../commandUtilities/channelUtilities');
const { db } = require('../../models/db');

module.exports = class OwnerEnableSlashCommand extends SlashCommand {
  constructor() {
    super('ownerEnable', {
      name: 'owner enable',
      parentCommand: 'owner',
      shortName: 'enable',
      ownerOnly: true,
      category: 'owner',
      prefixId: 'enable',
      commandType: 'sub',
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

    const embed = new EmbedBuilder()
      .setColor(Colors.Green);

    const failEmbed = new EmbedBuilder()
      .setColor(Colors.Red);

    if (!command) {
      return interaction.editReply({
        embeds: [
          failEmbed
            .setDescription(
              'Sorry, I couldn\'t find this command.',
            ),
        ],
      });
    }

    const isDisabled = this.client.globalCommandDisable.has(command.id);

    if (!isDisabled) {
      return interaction.editReply({
        embeds: [
          failEmbed
            .setDescription(`The \`${command.id}\` command is currently not disabled globally.`),
        ],
      });
    }

    this.client.globalCommandDisable.delete(command.id);
    db.query('DELETE FROM `globalCommandDisable` WHERE commandId = ?', [command.id]);
    return interaction.editReply({
      embeds: [
        embed
          .setDescription(`The \`${command.id}\` command has been enabled globally.`),
      ],
    });
  }

  autocomplete(interaction) {
    return autocomplete(interaction, this.client.messageCommandHandler);
  }
};
