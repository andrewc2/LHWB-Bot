const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");

class VersionCommand extends Command {
    constructor() {
        super("uversion", {
            aliases: ["uversion"],
            category: "utilities",
            description: {
                content: "Displays version information for the bot",
                usage: "uversion",
                examples: [
                    "uversion"
                ]
            },
            args: [
                {
                    id: "command",
                    type: "commandAlias"
                }
            ]
        });
    }

    exec(message) {
        db.query("SELECT * FROM version", function(err, rows) {
            const embed = new MessageEmbed()
                .setColor('#FF69B4') //pink
                .setTitle("Patch Notes:")
                .setAuthor(`Version: ${rows[0].versionNum}`, 'https://lhwb.dev/ts.png', 'https://lhwb.dev/')
                .setDescription(`${rows[0].patchNotes}`);
            message.channel.send({embed})
        });
    }
}

module.exports = VersionCommand;