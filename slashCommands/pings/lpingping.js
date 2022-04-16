const { SlashCommand } = require("discord-akairo");
const { Constants } = require("discord.js");

class LPingPingCommand extends SlashCommand {
    constructor() {
        super('lpingping', {
            name: 'lping ping',
            commandType: 'sub',
            parentCommandName: 'lping',
            shortCommandName: 'ping',
            args: [
                {
                    name: 'pinglist',
                    description: 'The pinglist to ping',
                    type: Constants.ApplicationCommandOptionTypes.STRING,
                    required: true,
                }
            ]
        });
    }

    exec(interaction) {
        interaction.reply('tbd');
    }
}

module.exports = LPingPingCommand;
