const { Command } = require("discord-akairo");
const config = require("../../config.json");
const { db } = require("../../models/db");
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
        const embed = this.client.util.embed()
            .setColor("#FF69B4")
            .setURL('https://lhwb.dev/recent.php')

        db.query("SELECT id, name FROM recent WHERE 1 ORDER BY id DESC LIMIT 11", function(err, rows) {
            let playingSong = rows[0]['name'];
            let recentSongs = "";
            
            for(let num = 1; num < rows.length; num++){ //starts with song 1 which was the most recent played before current
                recentSongs = `${recentSongs} ${num}. ${rows[num]['name']}\n`
            }
            embed.setTitle(`Currently playing: ${playingSong}`)
                .setDescription(`Recently Played:\n${recentSongs}`)
            message.channel.send({embed});
        });
    }
}

module.exports = RecentCommand