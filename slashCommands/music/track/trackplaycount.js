const { SlashCommand } = require("discord-akairo");
const { MessageEmbed, Constants } = require("discord.js");
const { isVoiceServer } = require("../../../utilities/permissions");
const { autocomplete } = require("../../../slashCommandUtilities/queueutilities");

class TrackPlayCountCommand extends SlashCommand {
    constructor() {
        super('trackplaycount', {
            name: 'track play-count',
            prefixId: "playcount",
            category: "music",
            channel: "guild",
            commandType: "sub",
            parentCommandName: "track",
            shortCommandName: "play-count",
            args: [
                {
                    name: "track",
                    description: "The name of the track to view the play count for",
                    type: Constants.ApplicationCommandOptionTypes.STRING,
                    required: true,
                    autocomplete: true
                }
            ]
        });
    }

    userPermissions(message) {
        if (isVoiceServer(message.guild.id)) return "Server";
    }

    async exec(interaction, message) {
        await interaction.deferReply();
        const track = interaction.options.getString("track", true);
        const trackType = this.client.commandHandler.resolver.type("song");
        const findTrack = await trackType(message, track);

        const failEmbed = new MessageEmbed().setColor("RED");

        if (!findTrack) {
            return await interaction.editReply({
                embeds: [failEmbed.setDescription("That song could not be found.\nPlease check the track listings (/tracks).\nIf it's not there ask iAndrewC to add the song.")]
            });
        }

        const embed = new MessageEmbed()
            .setTitle("Track Play Count")
            .setThumbnail(findTrack.album_art_url.toString())
            .addFields(
                { name: "Name", value: findTrack.official_name.toString(), inline: true },
                { name: "Play Count", value: findTrack.play_count.toString(), inline: true },
            )
            .setColor("PURPLE");

        return interaction.editReply({ embeds: [embed] });
    }

    async autocomplete(interaction) {
        await autocomplete(interaction);
    }
}

module.exports = TrackPlayCountCommand;
