const { Command } = require("discord-akairo");
const config = require("../../config.json");
const database = require("../../models/database");

class DequeueCommand extends Command {
    constructor() {
        super("current", {
            aliases: ["current"],
            category: "music",
            description: {
                content: "Shows what song is currently playing.",
                usage: "current",
                examples: [
                    "current"
                ]
            }
        });
    }

    userPermissions(message) {
        if (message.guild.id !== config.discord.serverID) return true;
    }

    async exec(message, args) {
        const embed = message.client.util
            .embed()
            .setColor(message.member.displayHexColor)

        database.recent.findAll({ order: [["id", "DESC"]], limit: 1 })
            .then(async function (results) {
                const thumbnail = await database.music.findOne({ where: { name: results[0].getDataValue("name") }})
                embed
                    .setThumbnail(thumbnail.getDataValue("albumart"))
                    .setTitle(results[0].getDataValue("name"))
                    .setDescription(results[0].getDataValue("album"))
                if (results[0].getDataValue("queuedby")) {
                    embed.setFooter(`Queued by: ${results[0].getDataValue("queuedby")}`)
                }
                return message.channel.send(embed)
            })
    }
}

module.exports = DequeueCommand;