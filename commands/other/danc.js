const { Command } = require("discord-akairo");

class dancCommand extends Command {
    constructor() {
        super("danc", {
            aliases: ["danc"],
            category: "other",
            description: {
                content: "Sends a :thinking: to chat.",
                usage: "danc",
                examples: [
                    "danc"
                ]
            }
        });
    }

    exec(message) {
        message.channel.send(`:thinking: :partying_face: :tada:`);
    }
}

module.exports = dancCommand;