const { SlashCommand } = require("discord-akairo");
const { Constants } = require("discord.js");

class TrackCommand extends SlashCommand {
    constructor() {
        super("track", {
            commandType: "command",
            name: "track",
            description: "View information related to tracks",
            args: [
                {
                    name: "list",
                    description: "View the available tracks to queue",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "information",
                    description: "View information about a track",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "play-count",
                    description: "See how many times a track has been played",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
            ]
        });
    }
}

module.exports = TrackCommand;
