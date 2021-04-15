const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { commandUsage } = require("../../utilities");

class LPingDropCommand extends Command {
    constructor() {
        super("lpingdrop", {
            aliases: ["lping drop"],
            category: "ping",
            description: {
                content: "Removes user from the specified ping list.",
                usage: "lping drop [list name]",
                examples: [
                    "lping drop chase"
                ]
            },
            args: [
                {
                    id: 'list',
                    type: 'lowercase',
                    otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage)
                }
            ]
        });
    }

    exec(message, args) {
        if (args.list == 'chase' || 'chasegang'){
            let chase = 0;
            db.query(
                "UPDATE pings SET chase=? WHERE discordID=?",[chase, message.author.id], function (err, result) {
                    if (err) throw err;
                        console.log(result);
                });
            const embed = new MessageEmbed()
                .setColor('#FF69B4')
                .setDescription(`You have dropped ${args.list}.`);
            message.channel.send({embed});
        } else {
            const embed = new MessageEmbed()
                .setColor('Red')
                .setDescription(`There is currently no ping by that name.`);
            message.channel.send({embed});
        }        
    }
}

module.exports = LPingDropCommand;