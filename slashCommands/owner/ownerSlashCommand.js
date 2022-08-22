const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class OwnerSlashCommand extends SlashCommand {
  constructor() {
    super('owner', {
      commandType: 'command',
      name: 'owner',
      description: 'Owner only bot commands',
      slashOptions: [
        {
          name: 'enable',
          description: 'Enable a command globally',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'disable',
          description: 'Disable a command globally',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'ban',
          description: 'Ban an entity from the bot',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'unban',
          description: 'Unban an entity from the bot',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'reload',
          description: 'Reload a command',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'avatar',
          description: 'Change the bots avatar',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'say',
          description: 'Speak as the bot',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'nickname',
          description: 'Change the bots nickname',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
