const { Command } = require("discord-akairo");
const config = require("../../config.json");
const { MessageEmbed } = require("discord.js");

class dcFixCommand extends Command {
    constructor() {
        super("dcfix", {
            aliases: ["dcfix"],
            category: "utility",
            cooldown: 30000,
            ratelimit: 1,
            description: {
                content: "Disconnectes the bot from the voice channel, allowing it to reconnect and resume playing music.",
                usage: "dcfix",
                examples: [
                    "dcfix"
                ]
            }
        });
    }

    exec(message) {
        const channel = this.client.channels.cache.get(config.discord.channelID)
        if (!channel) return console.log("I cannot find the voice channel.")
        channel.leave();
        console.log("Leaving voice channel. - User Requested Disconnect");
        const embed = new MessageEmbed()
            .setDescription("Disconnected from voice chat, auto-reconnecting.")
            .setColor('#9979FF')
        return message.channel.send(embed);
    }
}

module.exports = dcFixCommand;