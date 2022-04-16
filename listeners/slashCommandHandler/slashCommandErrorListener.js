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

    exec(err, message, command) {
        logger.log("error", `CommandHandler Error: ${err}\nWith Command: ${command.id}`);
        const embed = new MessageEmbed()
            .setDescription("An unknown error occurred. :pensive:")
            .setColor("RED");
        return message.interaction.reply({ embeds: [embed], ephemeral: true });
    }
}

module.exports = SlashCommandErrorListener;
