const { Command } = require("discord-akairo");

class eyerollCommand extends Command {
    constructor() {
        super("eyeroll", {
            aliases: ["eyeroll"],
            category: "other",
            description: {
                content: "Sends a :eyeroll: to chat.",
                usage: "eyeroll",
                examples: [
                    "eyeroll"
                ]
            }
        });
    }

    exec(message) {
        message.channel.send(`:rolling_eyes:`);
    }
}

module.exports = eyerollCommand;