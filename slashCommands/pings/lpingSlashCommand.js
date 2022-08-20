const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class LpingSlashCommand extends SlashCommand {
  constructor() {
    super('lping', {
      commandType: 'command',
      name: 'lping',
      description: 'Join, leave, and control pinglists in a server',
      slashOptions: [
        {
          name: 'ping',
          description: 'Ping a pinglist',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'create',
          description: 'Create a pinglist',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'delete',
          description: 'Delete a pinglist',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'drop',
          description: 'Remove yourself from a pinglist',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'joined',
          description: 'See a list of pinglist\'s you\'ve joined',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'list',
          description: 'See a list of all the pinglist\'s in this server',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'get',
          description: 'Join a pinglist',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'show',
          description: 'Get a list of everyone who\'s in a pinglist',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
