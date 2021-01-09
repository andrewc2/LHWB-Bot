const { Command } = require("discord-akairo");
const { anyUsage } = require("../../utilities");

class HelpCommand extends Command {
    constructor() {
        super("lhelp", {
            aliases: ["lhelp"],
            category: "utilities",
            description: {
                content: "Help command.",
                usage: "lhelp [command]",
                examples: [
                    "lhelp queue'"
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
        const musicCommands = this.client.util
            .embed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: "png"}), message.author.displayAvatarURL({dynamic: true, format: "png"}))
            .setTitle("Music Commands")
            .setDescription(`Use ${anyUsage(message.guild, this.client, `${this.id} [command]`)} for further information. The full command list is available here: https://lhwb.dev/`)
            .addFields(
                {name: "Music", value: "current, queue, dequeue, recent, skip"}
            )
            .setColor(message.member.displayHexColor)

        if (!args.command || args.command.id === "lhelp") {
            return message.channel.send(musicCommands)
        }
        else {
            const moduleEmbed = this.client.util
                .embed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: "png"}), message.author.displayAvatarURL({dynamic: true, format: "png"}))
                .setTitle(args.command.id)
                .setDescription(args.command.description.content || "No content provided")
                .setColor(message.member.displayHexColor)
                .addFields(
                    {name: "Example", value: anyUsage(message.guild, this.client, `${args.command.description.examples ? args.command.description.examples.map(e => `${e}`).join('\n') :  'No examples provided.'}`), inline: false},
                    {name: "Usage", value: anyUsage(message.guild, this.client, `${args.command.description.usage || 'No usage provided.'}`), inline: false}
                )
            if (args.command.aliases.length > 0) moduleEmbed.addField("Aliases", `\`${args.command.aliases.join('`, `')}\``, false);
            return message.channel.send(moduleEmbed)
        }
    }
}

module.exports = HelpCommand