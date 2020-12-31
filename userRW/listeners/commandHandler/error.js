const { Listener } = require("discord-akairo");

class ErrorListener extends Listener {
    constructor() {
        super("error", {
            event: "error",
            emitter: "commandHandler"
        });
    }

    exec(err, message, command) {
        console.log(`CommandHandler Error: ${err}`);
        const embed = this.client.util
            .embed()
            .setDescription("An unknown error occurred. :pensive:")
            .setColor("RED")
        return message.channel.send(embed)
    }
}

module.exports = ErrorListener;