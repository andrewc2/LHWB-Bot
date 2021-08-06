const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");

class debtCounterCommand extends Command {
    constructor() {
        super("debtcounter", {
            aliases: ["debtcounter", "oofcounter"],
            category: "other",
            description: {
                content: "Displays the number of oof's from WetPatootie.",
                usage: "debtcounter",
                examples: [
                    "debtcounter"
                ]
            }
        });
    }

    exec(message) {
        const failEmbed = new MessageEmbed()
            .setColor("RED")

        const successEmbed = new MessageEmbed()
            .setColor("#eb4034")

        db.query("SELECT * FROM counters WHERE word='oof'", function(err, rows) {
            if(rows[0] == null) {
                message.channel.send({ embeds: [failEmbed.setDescription('There was an error retrieving the oof counter.')]});
            } else {
                message.channel.send({ embeds: [successEmbed.setAuthor(`${rows[0]['user']}'s oof counter`, 'https://lhwb.dev/ts.png', 'https://turtlebyte.github.io/oofdebt/')
                .setDescription(`Total: ${rows[0]['counter']}`)
                .setFooter(`As of ${rows[0]['lastUsed']}`)]});
            }
        });
    }
}

module.exports = debtCounterCommand;