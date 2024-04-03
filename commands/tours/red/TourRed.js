import Command from '../../../structure/commands/Command.js';
import { ApplicationCommandOptionType } from 'discord.js';

export default class TourRed extends Command {
  constructor() {
    super('tourRed', {
      name: 'tour red',
      description: 'View information about Taylor Swift\'s Red tour',
      options: [
        {
          name: 'setlist',
          description: 'Displays the setlist for Taylor Swift\'s Red Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'guests',
          description: 'Displays the guest list on Taylor Swift\'s Red Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
      deploymentDetails: {
        commandType: 'group',
        parentCommand: 'tour',
        shortName: 'red',
      },
    });
  }
}
