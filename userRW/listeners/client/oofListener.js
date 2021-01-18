const { Listener } = require("discord-akairo");
const config = require("../../config.json");
const { db } = require("../../models/db");


class OofListener extends Listener {
    constructor() {
        super("ooflistener", {
            event: "message",
            emitter: "client"
        });
    }

    exec(message) {
        // If Patootie's message contains the word oof at least once, and it is not in #bots, the counter will increment by one.
        if (message.content.match(/oof/i) && message.author.id === config.discord.patootie && message.channel.id !== config.discord.botsChannel) {
            db.query("UPDATE counters SET counter=counter+1, lastUsed=CURRENT_TIMESTAMP WHERE word='oof' AND userID=?", [config.discord.patootie]);
        }
    }
}

module.exports = OofListener