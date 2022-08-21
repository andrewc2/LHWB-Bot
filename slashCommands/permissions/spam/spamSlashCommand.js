const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class SpamSlashCommand extends SlashCommand {
  constructor() {
    super('spam', {
      name: 'spam',
      commandType: 'command',
      category: 'permissions',
      description: 'Add, remove, and view all the spam channels',
      slashOptions: [
        {
          name: 'add',
          description: 'Add a spam channel',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'remove',
          description: 'Remove a spam channel',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'view',
          description: 'View all added spam channels',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
