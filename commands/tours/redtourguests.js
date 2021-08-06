const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class redTourGuestsCommand extends Command {
    constructor() {
        super("redguests", {
            aliases: ["redguests"],
            category: "tours",
            description: {
                content: "Displays the guest list on Taylor Swift's Red Tour.",
                usage: "redguests",
                examples: [
                    "redguests"
                ]
            }
        });
    }

    exec(message) {
        const embed = new MessageEmbed()
            .setColor(11476553)
            .setAuthor("The Red Tour - Special Guests", "https://lhwb.dev/ts.png", "https://en.wikipedia.org/wiki/The_Red_Tour#Tour_dates")
            .setThumbnail("https://upload.wikimedia.org/wikipedia/en/9/99/The_Red_Tour.png")
            .setDescription("3-19-13 (St. Louis N2) Hey Porsche - Nelly\n3-28-13 (Newark N2) Everybody Talks - Neon Trees (Tyler Glenn)\n3-29-13 (Newark N3) Drive By - Train (Pat Monahan)\n4-19-13 (Atlanta N2) Both of Us - B.o.B\n7-13-13 (East Rutherford) My Songs Know What You Did in the Dark (Light Em Up) - Fall Out Boy (Patrick Stump) \n7-27-13 (Foxborough N2) You're So Vain - Carly Simon\n8-19-13 (Los Angeles N1) Want U Back - Cher Lloyd; Brave - Sara Bareilles\n8-20-13 (Los Angeles N2) Closer - Tegan and Sara\n8-23-13 (Los Angeles N3) Anything Could Happen - Ellie Goulding\n8-24-13 (Los Angeles N4) Jenny From the Block - Jennifer Lopez\n8-27-13 (Sacramento) The Last Time - Gary Lightbody\n9-19-13 (Nashville N1) I Don't Want This Night to End - Luke Bryan\n9-20-13 (Nashville N2) What Hurts the Most - Jeffrey Steele (Rascal Flatts)\n9-21-13 (Nashville N3) I Want Crazy - Hunter Hayes\n2-1-14 (London N1) Lego House - Ed Sheeran (Normally Ed performs Everything Has Changed with Taylor)\n2-2-14 (London N2) Money on My Mind - Sam Smith\n2-4-14 (London N3) Breakeven - The Script (Danny O'Donoghue)\n2-7-14 (Berlin) I See Fire - Ed Sheeran (Normally Ed performs Everything Has Changed with Taylor)\n2-10-14 (London N4) Next to Me - Emeli Sandé\n2-11-14 (London N5) Burn - Ellie Goulding");
        message.channel.send({ embeds: [embed] })
    }
}

module.exports = redTourGuestsCommand;