const { SlashCommand } = require("discord-akairo");
const { Constants } = require("discord.js");

class LPingDeleteCommand extends SlashCommand {
    constructor() {
        super("lpingdelete", {
            name: "lping delete",
            category: "ping",
            channel: "guild",
            userPermissions: ["MANAGE_MESSAGES"],
            commandType: "sub",
            parentCommandName: "lping",
            shortCommandName: "delete",
            args: [
                {
                    name: "pinglist",
                    description: "The pinglist to delete",
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

module.exports = LPingDeleteCommand;
