const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class RecentSlashCommand extends SlashCommand {
  constructor() {
    super('recent', {
      commandType: 'command',
      name: 'recent',
      description: 'Control the music queue in a server',
      channel: 'guild',
      slashOptions: [
        {
          name: 'server',
          description: 'Shows the 10 most recently played songs on the server',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'user',
          description: 'Shows the 10 most recently listened to songs by user',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
