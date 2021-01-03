const { Command } = require("discord-akairo");
const database = require("../../models/database");
const { commandUsage, cmdRestrictions } = require("../../utilities");

class DequeueCommand extends Command {
    constructor() {
        super("dequeue", {
            aliases: ["dequeue", "dq"],
            category: "music",
            channel: "guild",
            description: {
                content: "Removes a song from the music queue.",
                usage: "dequeue [song]",
                examples: [
                    "dequeue All Too Well"
                ]
            },
            args: [
                {
                    id: "song",
                    type: "string",
                    match: "content",
                    otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage)
                }
            ]
        });
    }

    userPermissions(message) {
        return cmdRestrictions(message)
    }

    async exec(message, args) {
        const failEmbed = message.client.util
            .embed()
            .setColor("RED")

        const successEmbed = message.client.util
            .embed()
            .setColor("GREEN")

        const song = await database.queue.findOne({ where: { name: args.song }})
        if (song) {
            await song.destroy()
            return message.channel.send(successEmbed.setDescription(`${song.getDataValue("name")} has been removed from the queue.`))
        }
        else {
            return message.channel.send(failEmbed.setDescription("This song isn't in the queue at the moment."))
        }
    }
}

module.exports = DequeueCommand;