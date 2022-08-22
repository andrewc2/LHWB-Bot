const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType, EmbedBuilder, Colors } = require('discord.js');
const { autocomplete } = require('../../commandUtilities/channelUtilities');
const { db } = require('../../models/db');

module.exports = class OwnerDisableSlashCommand extends SlashCommand {
  constructor() {
    super('ownerDisable', {
      name: 'owner disable',
      parentCommand: 'owner',
      shortName: 'disable',
      ownerOnly: true,
      category: 'owner',
      prefixId: 'disable',
      commandType: 'sub',
      slashOptions: [
        {
          name: 'command',
          description: 'The command to disable',
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

    const guarded = ['botBan', 'botUnban', 'enable', 'disable', 'reload'];

    if (guarded.includes(command.id)) {
      return interaction.editReply({
        embeds: [
          failEmbed
            .setDescription(`The \`${command.id}\` command cannot be disabled as it is an essential command.`),
        ],
      });
    }

    const isDisabled = this.client.globalCommandDisable.has(command.id);

    if (isDisabled) {
      return interaction.editReply({
        embeds: [
          failEmbed
            .setDescription(`The \`${command.id}\` command is already disabled globally`),
        ],
      });
    }

    this.client.globalCommandDisable.set(command.id, command.id);
    db.query('INSERT INTO `globalCommandDisable` (commandId) VALUES (?)', [command.id]);
    return interaction.editReply({
      embeds: [
        embed
          .setDescription(`The \`${command.id}\` command has been disabled globally.`),
      ],
    });

  }

  autocomplete(interaction) {
    return autocomplete(interaction, this.client.messageCommandHandler);
  }
};
