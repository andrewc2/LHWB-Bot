const { SlashCommand } = require("discord-akairo");
const { MessageEmbed, Constants } = require("discord.js");

class ReloadCommand extends SlashCommand {
    constructor() {
        super("reload", {
            name: "reload",
            prefixId: "reload",
            category: "admin",
            commandType: "command",
            ownerOnly: true,
            description: "Reload a command (Owner Only).",
            args: [{
                name: "command",
                description: "The command to reload",
                type: Constants.ApplicationCommandOptionTypes.STRING,
                required: true,
                autocomplete: true,
            }]
        });
    }

    exec(interaction) {
        const commandOption = interaction.options.getString("command", true)
        const command = this.handler.modules.find(command => command.name === commandOption);

        if (!command) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription(
                            "Sorry, I couldn't find this command."
                        ),
                ],
            })
        }

        command.reload();
        return interaction.reply({
            embeds: [new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`The **${command.name}** command has been reloaded. :relaxed:`)]
        });
    }

    autocomplete(interaction) {
        const value = interaction.options.getString('command', true).toLowerCase() ?? 'a';
        const commands = this.handler.modules
            .map((command) => ({
                name: command.name.toLowerCase(),
                value: command.name.toLowerCase(),
            }))
            .filter((command) => command.name.startsWith(value, 0))
            .splice(0, 10);

        return interaction.respond(commands);
    }
}

module.exports = ReloadCommand;
