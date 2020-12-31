const { Command } = require("discord-akairo");
const config = require("../../config.json");
const database = require("../../models/database");
const { cmdRestrictions } = require("../../utilities");

class RecentCommand extends Command {
    constructor() {
        super("recent", {
            aliases: ["recent"],
            category: "music",
            channel: "guild",
            description: {
                content: "Shows the 10 most recently played songs.",
                usage: "recent",
                examples: [
                    "recent"
                ]
            }
        });
    }

    userPermissions(message) {
        if (message.guild.id !== config.discord.serverID) return true;
    }

    exec(message, args) {
        const embed = this.client.util
            .embed()
            .setTitle("Recently Played")
            .setColor("GREEN")

        database.recent.findAll({ order: [["id", "DESC"]], limit: 10 })
            .then(async function (results) {
                let songs = []
                for (let i = 0; i < results.length; i++) {
                    songs.push(`${i+1}. ${results[i].getDataValue("name")}`)
                }
                embed.setDescription(songs)
                return message.channel.send(embed)
            })
    }
}

module.exports = RecentCommand