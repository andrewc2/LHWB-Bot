const { Command } = require("discord-akairo");
const { db } = require("../../models/db");
const { dequeue } = require("../../music");
const { commandUsage, cmdRestrictions, log } = require("../../utilities");

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

        db.query("SELECT COUNT(*) AS queueCount FROM queue WHERE name = ?", [args.song], function(err, result){
            if (err) throw err;
            db.query("SELECT name FROM music WHERE name = ?", [args.song], function(err, rows) {        
                if(result[0].queueCount > 0) {
                    dequeue(args.song); //deletes the song from the queue.
                    log(rows[0].name + " removed from queue.");
                    return message.channel.send({ embeds: [successEmbed.setDescription(`${rows[0].name} has been removed from the queue.`)] })
                } else {
                    log(args.song + " not in queue.");
                    return message.channel.send({ embeds: [failEmbed.setDescription(`This song isn't in the queue at the moment.`)] })                     
                }
            });
        });
    }
}

module.exports = DequeueCommand;