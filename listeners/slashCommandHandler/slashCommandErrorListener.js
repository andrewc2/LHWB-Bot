const { Listener } = require("discord-akairo");
const { logger } = require("../../utilities/logging");
const {MessageEmbed} = require("discord.js");

class SlashCommandErrorListener extends Listener {
    constructor() {
        super("slashCommandError", {
            event: "commandBlocked",
            category: "slashCommandHandler",
            emitter: "slashCommandHandler",
        });
    }

    async exec(message, command, err) {
        logger.log("error", `CommandHandler Error: ${err}\nWith Command: ${command.id}`);
        const embed = new MessageEmbed()
            .setDescription("An unknown error occurred. :pensive:")
            .setColor("RED");

        return await (message.interaction.deferred || message.interaction.replied) ?
            message.interaction.editReply({ embeds: [embed] }) :
            message.interaction.reply({ embeds: [embed], ephemeral: true })
    }
}

module.exports = SlashCommandErrorListener;
