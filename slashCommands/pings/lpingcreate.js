const { SlashCommand } = require("discord-akairo");
const { Constants } = require("discord.js");

class LPingCreateCommand extends SlashCommand {
    constructor() {
        super('lpingcreate', {
            name: 'lping create',
            category: "ping",
            channel: "guild",
            userPermissions: ["MANAGE_MESSAGES"],
            commandType: 'sub',
            parentCommandName: 'lping',
            shortCommandName: 'create',
            args: [
                {
                    name: 'pinglist',
                    description: 'The name of the pinglist to delete',
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

module.exports = LPingCreateCommand;
