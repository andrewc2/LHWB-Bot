import Command from '../../../structure/commands/Command.js';
import { ApplicationCommandOptionType, PermissionsBitField } from 'discord.js';

export default class Spam extends Command {
  constructor() {
    super('spam', {
      name: 'spam',
      commandType: 'command',
      category: 'permissions',
      description: 'Add, remove, and view all the spam channels',
      userPermissions: [PermissionsBitField.Flags.ModerateMembers],
      guildOnly: true,
      options: [
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
      deploymentDetails: {
        commandType: 'command',
        musicServer: true,
      },
    });
  }
}
