const { SlashCommand } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
const { dequeue, play, searchQueue, randomSong } = require("../../music");
const { cmdRestrictions } = require("../../utilities/permissions");
const { db } = require("../../models/db");
const { GET_RECENT } = require("../../models/music-queries");

class SkipCommand extends SlashCommand {
    constructor() {
        super('skip', {
            name: 'skip',
            prefixId: "skip",
            category: "music",
            channel: "guild",
            commandType: "command",
            description: "Skips the current song"
        });
    }

    async userPermissions(message) {
        return await cmdRestrictions(message);
    }

    async exec(interaction) {
        await interaction.deferReply();
        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) {
            return interaction.editReply({ embeds: [
                    new MessageEmbed()
                        .setDescription("Connection to voice channel not found.")
                        .setColor("RED"),
                ]
            });
        }

        const embed = new MessageEmbed()
            .setDescription("Song skipped. Finding a new song... :musical_note:")
            .setColor("GREEN");

        const [result] = await db.promise().query(GET_RECENT, [interaction.guild.id, 1]);
        if (result[0]["queued_by"] !== null) {dequeue(result[0]["song_detail_id"], interaction.guild.id);}
        setTimeout(async () => {play(await searchQueue(interaction.guild) || await randomSong(interaction.guild), connection, this.client); }, 1000);
        return interaction.editReply({ embeds: [embed] });
    }
}

module.exports = SkipCommand;
