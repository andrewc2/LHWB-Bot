import Command from '../../structure/commands/Command.js';
import { ApplicationCommandOptionType } from 'discord.js';

export default class Tour extends Command {
  constructor() {
    super('tour', {
      name: 'tour',
      description: 'View information about Taylor Swift\'s tours',
      options: [
        {
          name: 'red',
          description: 'Displays information about Taylor Swift\'s Red Stadium Tour',
          type: ApplicationCommandOptionType.SubcommandGroup,
        },
        {
          name: '1989',
          description: 'Displays information about Taylor Swift\'s 1989 Stadium Tour',
          type: ApplicationCommandOptionType.SubcommandGroup,
        },
        {
          name: 'reputation',
          description: 'Displays information about Taylor Swift\'s reputation Stadium Tour',
          type: ApplicationCommandOptionType.SubcommandGroup,
        },
        {
          name: 'eras',
          description: 'Displays information about Taylor Swift\'s The Eras Tour',
          type: ApplicationCommandOptionType.SubcommandGroup,
        },
      ],
      deploymentDetails: {
        commandType: 'command',
      },
    });
  }
}
