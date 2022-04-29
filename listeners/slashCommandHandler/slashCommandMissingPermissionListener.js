const { Listener } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class SlashCommandMissingPermissionListener extends Listener {
    constructor() {
        super("slashCommandMissingPermissionListener", {
            event: "missingPermissions",
            category: "slashCommandHandler",
            emitter: "slashCommandHandler",
        });
    }

    exec(message, command, type, missing) {
        const embed = new MessageEmbed()
            .setColor('RED');

        if (type === 'client') {
            embed.setDescription(
                `I cannot use the **${command.name.toLowerCase()}** command in this server as I am missing the \`${missing}\` permission. Try again later.`
            );
        } else {
            embed.setDescription(
                `You need to have the \`${missing}\` permission to use the **${command.name.toLowerCase()}** command in this server.`
            );
        }
        return message.interaction.reply({ embeds: [embed], ephemeral: true });
    }
}

module.exports = SlashCommandMissingPermissionListener;
