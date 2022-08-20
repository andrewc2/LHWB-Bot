const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class QueueSlashCommand extends SlashCommand {
  constructor() {
    super('queue', {
      commandType: 'command',
      name: 'queue',
      description: 'Control the music queue in a server',
      slashOptions: [
        {
          name: 'add',
          description: 'Add a track to the queue',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'show',
          description: 'View which tracks are currently in the queue',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'clear',
          description: 'Clear the queue',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'album',
          description: 'Add an album to the queue',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'remove',
          description: 'Remove a track from the queue',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'album-list',
          description: 'View which albums are queueable',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
