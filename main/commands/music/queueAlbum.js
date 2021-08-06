const { Command } = require("discord-akairo");
const fs = require("fs");
const { MessageEmbed } = require("discord.js")
const { db } = require("../../models/db");
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
                    type: ["1989", "reputation", "folklore", "evermore", "fearlesstv"],
                    otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage)
                }
            ]
        });
    }

    userPermissions(message) {
        return isMod(message)
    }

    exec(message, args) {
        const embed = new MessageEmbed()
            .setColor("GREEN")

            db.promise().query("SELECT * FROM `album` WHERE `album` = ? ORDER BY `albumorder`", [args.album])
            .then(async ([rows]) => {
                for (const song of rows.values()) {
                    const checkQueue = await db.promise().query("SELECT * FROM `queue` WHERE `name` = ?", [song.name])
                    if (checkQueue[0].length > 0) {
                        await db.promise().query("DELETE FROM `queue` WHERE `name` = ?", [song.name])
                    }
                    fs.access(`${config.discord.music_path}${song.path}`, fs.F_OK,async (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        await db.promise().query("INSERT INTO `queue` (name, path, queuedby) VALUES (?,?,?)", [song.name, song.path, message.author.tag])
                    })
                }
            })
            .then(() => {
                embed.setDescription(`${args.album} has been queued! Hope you enjoy it. :smiley:`)
                return message.channel.send(embed)
            })
            .catch(err => {
                console.log(err)
                embed.setDescription(`I couldn't queue ${args.album} for some reason. :pleading_face:`)
                return message.channel.send(embed)
            })
    }
}

module.exports = QueueAlbumCommand