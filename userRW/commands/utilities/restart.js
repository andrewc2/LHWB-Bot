const { Command } = require("discord-akairo");
const Discord = require("discord.js");
const { isMod } = require("../../utilities");

class RestartCommand extends Command {
    constructor() {
        super("umusicrestart", {
            aliases: ["umusicrestart"],
            category: "utilities",
            description: {
                content: "Restarts the bot",
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

    userPermissions(message) {
        return isModNoVC(message)
    }

    exec(message) {
        console.log("LHWB user-music restarting!");
        const embed = new Discord.MessageEmbed()
            .setColor(16711680) //red
            .setDescription(`LHWB user-music restarting!`);
        message.channel.send({embed}).then(() => process.exit(-1));
    }
}

module.exports = RestartCommand;