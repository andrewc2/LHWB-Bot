const { Command } = require("discord-akairo");
const fs = require("fs");
const database = require("../../models/database");
const config = require("../../config.json");
const { commandUsage, isMod } = require("../../utilities");

class QueueAlbumCommand extends Command {
    constructor() {
        super("queuealbum", {
            aliases: ["queuealbum", "qa"],
            category: "music",
            description: {
                content: "Queues an album.",
                usage: "queuealbum [album]",
                examples: [
                    "queuealbum reputation"
                ]
            },
            args: [
                {
                    id: "album",
                    type: ["reputation", "evermore"],
                    otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage)
                }
            ]
        });
    }

    userPermissions(message) {
        return isMod(message)
    }

    exec(message, args) {
        const embed = this.client.util
            .embed()
            .setColor("GREEN")

        let failedQueue = []

        database.album.findAll({ where: { album: args.album }, order: [["albumorder", "ASC"]]})
            .then(async function (result) {
                for (const tracks of result.values()) {
                    const checkQueue = await database.queue.findOne({ where: { name: tracks.getDataValue("name") }})
                    if (checkQueue) await checkQueue.destroy()
                    fs.access(`${config.discord.music_path}${tracks.getDataValue("path")}`, fs.F_OK, async (err) => {
                        if (err) {
                            await failedQueue.push(tracks.getDataValue("name"))
                        }
                        else {
                            await database.queue.create({ name: tracks.getDataValue("name"), path: tracks.getDataValue("path"), queuedby: message.author.tag })
                        }
                    })
                }
            })


        embed.setDescription(`${args.album} has been queued! Hope you enjoy it. :smiley:`)
        if (failedQueue.length > 0) {
            embed.addField("Unable to queue", failedQueue, true)
        }
        return message.channel.send(embed)
    }
}

module.exports = QueueAlbumCommand