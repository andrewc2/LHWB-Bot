const { Command } = require("discord-akairo");

class wtnyCommand extends Command {
    constructor() {
        super("wtny", {
            aliases: ["wtny"],
            category: "other",
            cooldown: 10000,
            ratelimit: 1,
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