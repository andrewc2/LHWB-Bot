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
    });
  }
};
