const { Listener } = require("discord-akairo");
const { log } = require("../../utilities");

class ErrorListener extends Listener {
    constructor() {
        super("error", {
            event: "error",
            emitter: "commandHandler"
        });
    }

    exec(err, message, command) {
        log(`CommandHandler Error: ${err}\nWith Command: ${command}`);
        const embed = this.client.util
            .embed()
            .setDescription("An unknown error occurred. :pensive:")
            .setColor("RED")
        return message.channel.send({ embeds: [embed] })
    }
}

module.exports = ErrorListener;