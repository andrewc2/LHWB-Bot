const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
//const { isModNoVC } = require("../../utilities");
const { cmdRestrictions } = require("../../utilities");

class RestartCommand extends Command {
    constructor() {
        super("lrestart", {
            aliases: ["lrestart", "urestart", "umusicrestart"],
            category: "utilities",
            cooldown: 3000,
            ratelimit: 1,
            description: {
                content: "Restarts the bot",
                usage: "lrestart",
                examples: [
                    "lrestart"
                ]
            }
        });
    }

    userPermissions(message) {
        return cmdRestrictions(message)
    }

    exec(message) {
        console.log("LHWB user-music restarting!");
        const embed = new MessageEmbed()
            .setColor(16711680) //red
            .setDescription(`LHWB user-music restarting!`);
        message.channel.send({ embeds: [embed] }).then(() => process.exit(-1));
    }
}

module.exports = RestartCommand;