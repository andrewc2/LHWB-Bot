const { Command } = require('discord-akairo');
const config = require("../../config.json");

class PrefixCommand extends Command {
    constructor() {
        super("prefix", {
            aliases: ["prefix"],
            category: "bot",
            channel: "guild",
            description: {
                content: "Shows the command prefix.",
                usage: "prefix [prefix/default]",
                examples: [
                    "prefix"
                ]
            }
        });
    }

    exec(message, args) {
        const embed = this.client.util
            .embed()
            .setColor(message.member.displayHexColor)

        const prefix = this.client.settings.get(message.guild.id, 'prefix', config.discord.prefix);
        return message.channel.send(embed.setDescription(`The command prefix is \`${prefix || 'none set'}\`. To run commands, use \`${prefix}command\`.`))
    }
}

module.exports = PrefixCommand;