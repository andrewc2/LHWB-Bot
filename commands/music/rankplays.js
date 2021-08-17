const { Command, Argument  } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const { db } = require("../../models/db");

class rankPlaysCommand extends Command {
    constructor() {
        super("rankplays", {
            aliases: ["rankplays"],
            category: "music",
            channel: "guild",
            description: {
                content: "Shows a ranking of the most played songs. (Limited to a max of 25 songs)",
                usage: "rankplays [number 5-25, defaults to 5]",
                examples: [
                    "rankplays 13"
                ]
            },
            args: [
                {
                    id: "listNum",
                    type: Argument.range('number', 5, 26),
                    default: 5
                }
            ]
        });
    }

    userPermissions(message) {
        if (message.guild.id !== config.discord.serverID) return "Server";
    }

    exec(message, args) {
        db.query("SELECT ANY_VALUE(name) AS song, path, MAX(playcount) AS plays FROM music WHERE playcount > 0 GROUP BY path ORDER BY plays DESC LIMIT ?", [args.listNum], function(err, rows) {
            let rankedPlays = "";

            for(let num = 0; num < rows.length; num++)
                rankedPlays = rankedPlays + `${num+1}. ${rows[num]['song']} - ${rows[num]['plays']} plays\n`;

            const embed = new MessageEmbed()
                .setColor('#FF69B4')
                .setTitle('Ranked Plays:')
                .setDescription(rankedPlays)
                .setURL('https://lhwb.dev/recent.php')
            message.channel.send({ embeds: [embed] });
        });
    }
}

module.exports = rankPlaysCommand