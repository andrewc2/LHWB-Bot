import Command from '../../../structure/commands/Command.js';
import { ApplicationCommandOptionType } from 'discord.js';

export default class Queue extends Command {
  constructor() {
    super('queue', {
      name: 'queue',
      description: 'Control the music queue in a server',
      guildOnly: true,
      options: [
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
      deploymentDetails: {
        commandType: 'command',
        musicServer: true,
      },
    });
  }
}
