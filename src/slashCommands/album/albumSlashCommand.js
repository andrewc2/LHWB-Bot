const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class AlbumSlashCommand extends SlashCommand {
  constructor() {
    super('album', {
      commandType: 'command',
      name: 'album',
      description: 'View information about Taylor Swift\'s albums',
      slashOptions: [
        {
          name: 'debut',
          description: 'Displays the track list for Taylor Swift\'s album Taylor Swift',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'beautiful-eyes',
          description: 'Displays the track list for Taylor Swift\'s EP Beautiful Eyes',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'fearless',
          description: 'Displays the track list for Taylor Swift\'s album Fearless',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'speak-now',
          description: 'Displays the track list for Taylor Swift\'s album Speak Now',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'red',
          description: 'Displays the track list for Taylor Swift\'s album Red',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: '1989',
          description: 'Displays the track list for Taylor Swift\'s album 1989',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'reputation',
          description: 'Displays the track list for Taylor Swift\'s album reputation',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'lover',
          description: 'Displays the track list for Taylor Swift\'s album Lover',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'folklore',
          description: 'Displays the track list for Taylor Swift\'s album folklore',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'evermore',
          description: 'Displays the track list for Taylor Swift\'s album evermore',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
