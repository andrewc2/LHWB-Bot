const { Command } = require("discord-akairo");
const config = require("../../config.json");
const { MessageEmbed } = require("discord.js");
const {	joinVoiceChannel } = require('@discordjs/voice');

class reJoinCommand extends Command {
    constructor() {
        super("rejoin", {
            aliases: ["rejoin"],
            category: "utility",
            cooldown: 30000,
            ratelimit: 1,
            description: {
                content: "Reconnect and resume playing music in default channel.",
                usage: "dcfix",
                examples: [
                    "dcfix"
                ]
            }
        });
    }

    exec(message) {
        const channel = this.client.channels.cache.get(config.discord.channelID);
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        if (!channel) return console.log("I cannot find the voice channel.")
        connection.state.subscription.player.unpause();        
        const embed = new MessageEmbed()
            .setDescription("Disconnected from voice chat, auto-reconnecting.")
            .setColor('#9979FF')
        return message.channel.send({ embeds: [embed] });
    }
}

module.exports = reJoinCommand;