const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");

class requestCommand extends Command {
    constructor() {
        super("request", {
            aliases: ["request"],
            category: "other",
            description: {
                content: "Request something be added to the bot",
                usage: "request",
                examples: [
                    "Request [song/gif/feature]"
                ]
            },
            args: [
                {
                    id: 'request',
                    type: 'string'
                }
            ]
        });
    }

    exec(message, args) {
        db.query("INSERT INTO requested (user, request) VALUES (?,?)", [message.author.tag, args.request]);
        const embed = new MessageEmbed()
            .setColor('#FF69B4') //pink
            .setDescription('Request Submitted!');
        message.channel.send({embed})
    }
}

module.exports = requestCommand;