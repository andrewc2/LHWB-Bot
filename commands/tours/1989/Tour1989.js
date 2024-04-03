import Command from '../../../structure/commands/Command.js';
import { ApplicationCommandOptionType } from 'discord.js';

export default class Tour1989 extends Command {
  constructor() {
    super('tour1989', {
      name: 'tour 1989',
      description: 'View information about Taylor Swift\'s 1989 tour',
      options: [
        {
          name: 'setlist',
          description: 'Displays the setlist for Taylor Swift\'s 1989 World Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'guests',
          description: 'Displays the guest list on Taylor Swift\'s 1989 World Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'secret-songs',
          description: 'Displays the secret songs from Taylor Swift\'s 1989 World Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
      deploymentDetails: {
        commandType: 'group',
        parentCommand: 'tour',
        shortName: '1989',
      },
    });
  }
}
