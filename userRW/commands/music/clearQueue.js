const { Command } = require("discord-akairo");
const database = require("../../models/database");
const { cmdRestrictions } = require("../../utilities");

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
        const embed = message.client.util
            .embed()
            .setColor("GREEN")

        await database.queue.destroy({ truncate: true })
        return message.channel.send(embed.setDescription("Queue has been cleared."))
    }
}

module.exports = ClearQueueCommand;