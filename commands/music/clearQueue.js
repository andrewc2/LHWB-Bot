const { Command } = require("discord-akairo");
const { db } = require("../../models/db");
const { cmdRestrictions, log } = require("../../utilities");

class ClearQueueCommand extends Command {
    constructor() {
        super("clearqueue", {
            aliases: ["clearqueue", "cq"],
            category: "music",
            channel: "guild",
            description: {
                content: "Clears the queue.",
                usage: "clearqueue",
                examples: [
                    "clearqueue"
                ]
            }
        });
    }

    userPermissions(message) {
        return cmdRestrictions(message)
    }

    async exec(message, args) {
        const embed = message.client.util.embed()
            .setColor("GREEN")

        db.query("SELECT COUNT(*) AS queueCount FROM queue", function(err, result){
            if (err) throw err;
            if(result[0].queueCount > 0) {
                db.query("DELETE FROM queue"); //deletes entire queue.
                message.channel.send({ embeds: [embed.setDescription(`The queue has been cleared 🧹.`)] });
                log("Queue Purged at user request.");
            } else {
                message.channel.send({ embeds: [embed.setDescription(`The queue is already empty.`)
                    .setColor('RED')] });
                log("Queue empty, nothing to purge.");
            }
        });
    }
}

module.exports = ClearQueueCommand;