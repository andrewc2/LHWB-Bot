const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { commandUsage, log } = require("../../utilities");

class LPingGetCommand extends Command {
    constructor() {
        super("lpingget", {
            aliases: ["lping get"],
            category: "ping",
            description: {
                content: "Add user to the specified ping list.",
                usage: "lping get [list name]",
                examples: [
                    "lping get chase"
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
        if (args.list === 'chase' || args.list === 'chasegang'){
            db.query("SELECT * FROM `pings` WHERE discordID=?", [message.author.id], function(err, rows) {
                if ( rows > 0 || rows[0].chase === 0 ) {
                    db.query(
                        "INSERT INTO pings (discordID, discordTag, chase) VALUES (?,?,?) " +
                        "ON DUPLICATE KEY UPDATE chase=?, discordTag=?",
                        [message.author.id, message.author.tag, '1', '1', message.author.tag], function (err, result) {
                            if (err) throw err;
                        });
                    const embed = new MessageEmbed()
                        .setColor('#FF69B4')
                        .setDescription(`You have been added to ${args.list}.`);
                    message.channel.send({embed});
                } else {
                    const embed = new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`You already have the ${args.list} ping.`);
                    message.channel.send({embed});
                }
            });
            
        } else {
            const embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`There is currently no ping by that name.`);
            message.channel.send({embed});
        }  
    }
}

module.exports = LPingGetCommand;