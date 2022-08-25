const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class TrustedSlashCommand extends SlashCommand {
  constructor() {
    super('trusted', {
      name: 'trusted',
      commandType: 'command',
      category: 'permissions',
      description: 'Set, clear, and view the trusted role',
      channel: 'guild',
      slashOptions: [
        {
          name: 'set',
          description: 'Set the trusted role',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'clear',
          description: 'Clear the trusted role',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'view',
          description: 'View the trusted role',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
