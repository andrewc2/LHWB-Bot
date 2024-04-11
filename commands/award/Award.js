import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType } from 'discord.js';

export default class Award extends Command {
  constructor() {
    super('award', {
      name: 'award',
      description: 'Add, view, and remove member awards',
      guildOnly: true,
      options: [
        {
          name: 'view',
          description: 'View a members awards',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'add',
          description: 'Add an award to a member',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'remove',
          description: 'Remove an award from a member',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
      deploymentDetails: {
        commandType: 'command',
        limited: true,
      },
    });
  }
}
