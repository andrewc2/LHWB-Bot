const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { commandUsage } = require("../../utilities");

class requestCommand extends Command {
    constructor() {
        super("request", {
            aliases: ["request"],
            category: "other",
            description: {
                content: "Request something be added to the bot",
                usage: "request [song/gif/feature]",
                examples: [
                    "request More Lorde songs"
                ]
            },
            args: [
                {
                    id: 'request',
                    type: 'string',
                    match: 'content',
                    otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage)
                }
            ]
        });
    }

    exec(message, args) {
        db.query("INSERT INTO requested (user, request) VALUES (?,?)", [message.author.tag, args.request]);
        const embed = new MessageEmbed()
            .setColor('#FF69B4') //pink
            .setDescription('Request Submitted!');
        message.channel.send({ embeds: [embed]})
    }
}

module.exports = requestCommand;