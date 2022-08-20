const { SlashCommand } = require('discord-akairo');
const { EmbedBuilder, ApplicationCommandOptionType, Colors } = require('discord.js');

module.exports = class ReloadSlashCommand extends SlashCommand {
  constructor() {
    super('reload', {
      name: 'reload',
      prefixId: 'reload',
      category: 'admin',
      commandType: 'command',
      ownerOnly: true,
      description: 'Reload a command (Owner Only).',
      slashOptions: [
        {
          name: 'command',
          description: 'The command to reload',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
        },
      ],
    });
  }

  exec(interaction) {
    const commandOption = interaction.options.getString('command', true);
    const command = this.handler.modules.find(slashCommand => slashCommand.name === commandOption);

    if (!command) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Red)
            .setDescription(
              'Sorry, I couldn\'t find this command.',
            ),
        ],
      });
    }

    void command.reload();
    return interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(Colors.Green)
        .setDescription(`The **${command.name}** command has been reloaded. :relaxed:`)],
    });
  }

  autocomplete(interaction) {
    const value = interaction.options.getString('command', true).toLowerCase() ?? 'a';
    const commands = this.handler.modules
      .map((command) => ({
        name: command.name.toLowerCase(),
        value: command.name.toLowerCase(),
      }))
      .filter((command) => command.name.startsWith(value, 0))
      .splice(0, 10);

    return interaction.respond(commands);
  }
};
