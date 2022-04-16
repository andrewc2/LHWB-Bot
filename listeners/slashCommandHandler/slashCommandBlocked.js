const { Listener } = require("discord-akairo");

class SlashCommandBlocked extends Listener {
    constructor() {
        super("slashCommandBlocked", {
            event: "commandBlocked",
            category: "slashCommandHandler",
            emitter: "slashCommandHandler",
        });
    }

    exec(message, command, reason) {
        const commandName = command.name
        const embed = this.client.util
            .embed()
            .setDescription(`You cannot use the **${commandName}** command at the moment.`)
            .setColor("RED");

        switch(reason) {
            case "guild":
                embed
                    .setDescription(`You cannot use the **${commandName}** command in DMs. Please try again in a server.`);
                break;
            case "owner":
                embed
                    .setDescription(`Only the bot owner can use the **${commandName}** command.`);
                break;
            case "commandChannelDisabled":
                embed
                    .setDescription(`The **${commandName}** command has been disabled in **${message.channel}.**`);
                break;
        }

        return message.interaction.reply({ embeds: [embed], ephemeral: true })
    }
}

module.exports = SlashCommandBlocked;
