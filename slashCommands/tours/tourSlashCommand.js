const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class TourSlashCommand extends SlashCommand {
  constructor() {
    super('tour', {
      commandType: 'command',
      name: 'tour',
      description: 'View information about Taylor Swift\'s tours',
      slashOptions: [
        {
          name: 'red-tour-setlist',
          description: 'Displays the setlist for Taylor Swift\'s Red Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'red-tour-guests',
          description: 'Displays the guest list on Taylor Swift\'s Red Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: '1989-tour-setlist',
          description: 'Displays the setlist for Taylor Swift\'s 1989 World Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: '1989-tour-guests',
          description: 'Displays the guest list on Taylor Swift\'s 1989 World Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: '1989-tour-secret-songs',
          description: 'Displays the secret songs from Taylor Swift\'s 1989 World Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'reputation-tour-setlist',
          description: 'Displays the setlist for Taylor Swift\'s reputation Stadium Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'reputation-tour-guests',
          description: 'Displays the guest list on Taylor Swift\'s reputation Stadium Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'reputation-tour-secret-songs',
          description: 'Displays the secret songs from Taylor Swift\'s reputation Stadium Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
