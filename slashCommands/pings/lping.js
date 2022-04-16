const { SlashCommand } = require("discord-akairo");
const { Constants } = require("discord.js");

class LPingCommand extends SlashCommand {
    constructor() {
        super('lping', {
            commandType: 'command',
            name: 'lping',
            description: 'test',
            args: [
                {
                    name: 'ping',
                    description: 'Ping a pinglist',
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: 'create',
                    description: 'Create a pinglist',
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: 'delete',
                    description: 'Delete a pinglist',
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                }
            ]
        });
    }
}

module.exports = LPingCommand;
