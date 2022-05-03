const { SlashCommand } = require("discord-akairo");
const { Constants } = require("discord.js");

class QueueCommand extends SlashCommand {
    constructor() {
        super("queue", {
            commandType: "command",
            name: "queue",
            description: "Control the music queue in a server",
            args: [
                {
                    name: "add",
                    description: "Add a track to the queue",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "show",
                    description: "View which tracks are currently in the queue",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "clear",
                    description: "Clear the queue",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "album",
                    description: "Add an album to the queue",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "remove",
                    description: "Remove a track from the queue",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "album-list",
                    description: "View which albums are queueable",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
            ]
        });
    }
}

module.exports = QueueCommand;
