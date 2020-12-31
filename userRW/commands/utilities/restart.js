const { Command } = require("discord-akairo");
const Discord = require("discord.js");
const { anyUsage } = require("../../utilities");

class RestartCommand extends Command {
    constructor() {
        super("umusicrestart", {
            aliases: ["umusicrestart"],
            category: "utilities",
            description: {
                content: "Help command.",
                usage: "umusicrestart",
                examples: [
                    "umusicrestart'"
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

    exec(message, args) {
        console.log("LHWB user-music restarting!");
        const embed = new Discord.MessageEmbed()
            .setColor(16711680) //red
            .setDescription(`LHWB user-music restarting!`);
        message.channel.send({embed}).then(() => process.exit(-1));
    }
}

module.exports = RestartCommand;