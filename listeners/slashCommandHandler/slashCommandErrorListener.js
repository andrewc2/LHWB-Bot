const { Listener } = require("discord-akairo");
const { logger } = require("../../utilities/logging");
const { MessageEmbed } = require("discord.js");

class SlashCommandErrorListener extends Listener {
    constructor() {
        super("slashCommandError", {
            event: "error",
            category: "slashCommandHandler",
            emitter: "slashCommandHandler",
        });
    }

    async exec(err, message, command) {
        logger.log("error", `SlashCommandHandler Error: ${err}\nWith Command: ${command.id}`);

        const embed = new MessageEmbed()
            .setDescription("An unknown error occurred. :pensive:")
            .setColor("RED");

        const repliedOrDeferred = message.interaction.deferred ?? message.interaction.replied;

        return repliedOrDeferred
            ? message.interaction.editReply({ embeds: [embed] })
            : message.interaction.reply({ embeds: [embed], ephemeral: true });
    }
}

module.exports = SlashCommandErrorListener;
