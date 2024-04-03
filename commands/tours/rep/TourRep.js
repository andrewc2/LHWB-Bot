import Command from '../../../structure/commands/Command.js';
import { ApplicationCommandOptionType } from 'discord.js';

export default class TourRep extends Command {
  constructor() {
    super('tourRep', {
      name: 'tour reputation',
      description: 'View information about Taylor Swift\'s reputation tour',
      options: [
        {
          name: 'setlist',
          description: 'Displays the setlist for Taylor Swift\'s reputation Stadium Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'guests',
          description: 'Displays the guest list on Taylor Swift\'s reputation Stadium Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'secret-songs',
          description: 'Displays the secret songs from Taylor Swift\'s reputation Stadium Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
      deploymentDetails: {
        commandType: 'group',
        parentCommand: 'tour',
        shortName: 'reputation',
      },
    });
  }
}
