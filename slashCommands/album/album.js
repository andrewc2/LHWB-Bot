const { SlashCommand } = require("discord-akairo");
const { Constants } = require("discord.js");

class AlbumCommand extends SlashCommand {
    constructor() {
        super("album", {
            commandType: "command",
            name: "album",
            description: "View information related to tracks",
            args: [
                {
                    name: "debut",
                    description: "Displays the track list for Taylor Swift's album Taylor Swift.",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "beautiful-eyes",
                    description: "Displays the track list for Taylor Swift's EP Beautiful Eyes.",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "fearless",
                    description: "Displays the track list for Taylor Swift's album Fearless.",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "speak-now",
                    description: "Displays the track list for Taylor Swift's album Speak Now.",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "red",
                    description: "Displays the track list for Taylor Swift's album Red.",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "1989",
                    description: "Displays the track list for Taylor Swift's album 1989.",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "reputation",
                    description: "Displays the track list for Taylor Swift's album reputation.",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "lover",
                    description: "Displays the track list for Taylor Swift's album Lover.",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "folklore",
                    description: "Displays the track list for Taylor Swift's album folklore.",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
                {
                    name: "evermore",
                    description: "Displays the track list for Taylor Swift's album evermore.",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                },
            ]
        });
    }
}

module.exports = AlbumCommand;
