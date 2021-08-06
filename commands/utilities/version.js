const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");

class VersionCommand extends Command {
    constructor() {
        super("lversion", {
            aliases: ["lversion","uversion"],
            category: "utilities",
            description: {
                content: "Displays version information for the bot",
                usage: "lversion",
                examples: [
                    "lversion"
                ]
            }
        });
    }

    exec(message) {
        db.query("SELECT * FROM version", function(err, rows) {
            const embed = new MessageEmbed()
                .setColor('#FF69B4') //pink
                .setTitle("Patch Notes:")
                .setAuthor(`Version: ${rows[0].versionNum}`, 'https://lhwb.dev/ts.png', 'https://lhwb.dev/')
                .setDescription(`${rows[0].patchNotes}`);
            message.channel.send({ embeds: [embed] })
        });
    }
}

module.exports = VersionCommand;