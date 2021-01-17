const { Command } = require("discord-akairo");

class wtnyCommand extends Command {
    constructor() {
        super("wtny", {
            aliases: ["wtny"],
            category: "other",
            description: {
                content: "Welcomes new users to the server.",
                usage: "wtny",
                examples: [
                    "wtny"
                ]
            }
        });
    }

    exec(message) {
        message.channel.send({files: ["https://i.imgur.com/02RxUF4.gif"]});
    }
}

module.exports = wtnyCommand;