const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class ChannelSlashCommand extends SlashCommand {
  constructor() {
    super('channel', {
      name: 'channel',
      commandType: 'command',
      category: 'permissions',
      description: 'Enable and disable commands in a channel',
      channel: 'guild',
      slashOptions: [
        {
          name: 'disable',
          description: 'Disable a command in a channel',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'enable',
          description: 'Enable a command in a channel',
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    });
  }
};
