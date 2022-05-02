const { SlashCommand } = require("discord-akairo");
const { Constants } = require("discord.js");

class LPingCommand extends SlashCommand {
    constructor() {
        super("lping", {
            commandType: "command",
            name: "lping",
            description: "Join, leave, and control pinglists in a server",
            args: [
                {
                    name: "ping",
                    description: "Ping a pinglist",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "create",
                    description: "Create a pinglist",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "delete",
                    description: "Delete a pinglist",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "drop",
                    description: "Remove yourself from a pinglist",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "joined",
                    description: "See a list of which pinglist's you've joined",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "list",
                    description: "See a list of all available pinglist's in this server",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "get",
                    description: "Join a pinglist",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "show",
                    description: "Get a list of everyone who's in a pinglist",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                }
            ]
        });
    }
}

module.exports = LPingCommand;
