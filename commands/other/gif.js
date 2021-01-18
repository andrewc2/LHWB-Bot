const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");

class gifCommand extends Command {
    constructor() {
        super("gif", {
            aliases: ["gif"],
            category: "other",
            description: {
                content: "Displays a random Taylor related gif.",
                usage: "gif",
                examples: [
                    "gif"
                ]
            }
        });
    }

    exec(message) {
        db.query("SELECT path FROM gifs ORDER BY RAND() LIMIT 1", function(err, rows) {
            const embed = new MessageEmbed()
                .setColor('#FF69B4') //pink
                .setImage(`${rows[0].path}`)
                .setFooter('Submit gifs to be added using !request [imgur url]', message.client.user.displayAvatarURL({dynamic: true, format: "png"}));
            message.channel.send({embed})
        });
    }
}

module.exports = gifCommand;