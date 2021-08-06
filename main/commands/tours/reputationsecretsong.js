const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class repSecretSongCommand extends Command {
    constructor() {
        super("repss", {
            aliases: ["repss", "repsecretsong", "reputationsecretsong"],
            category: "tours",
            description: {
                content: "Displays the secret songs from Taylor Swift's reputation Tour.",
                usage: "repss",
                examples: [
                    "repss"
                ]
            }
        });
    }

    exec(message) {
        const failEmbed = new MessageEmbed()
            .setColor("RED")

        const successEmbed = new MessageEmbed()
            .setColor(568027)
            .setAuthor("reputation Stadium Tour: Secret Songs", "https://lhwb.dev/ts.png", "https://docs.google.com/spreadsheets/d/1Yt0_VqcPczB9GxKf9BGCpNcSWXTROlpdrEcTP1wmevs/edit")
            .setThumbnail("https://i.imgur.com/Zhg0oXF.jpg")

        if (message.guild != null){
            message.channel.send(successEmbed.setDescription("Due to the number of secret songs I've DM'd you the full list!"));
        }
        message.author.send(successEmbed.setDescription("1. All Too Well (Glendale)\n2. Wildest Dreams (Santa Clara)\n3. The Best Day (Santa Clara)\n4. Red (Pasadena)\n5. All Too Well (Pasadena)\n6. Holy Ground (Seattle)\n7. Teardrops on My Guitar (Denver)\n8. Our Song (Chicago)\n9. 22 (Chicago)\n10. I Knew You Were Trouble (Manchester)\n11. I Don't Wanna Live Forever (Manchester)\n12. Mean (Dublin)\n13. How You Get The Girl (Dublin)\n14. So It Goes...(London)\n15. Fifteen (London)\n16. Mine (Louisville)\n17. Sparks Fly (Columbus)\n18. State of Grace (DC)\n19. Haunted (DC)\n20. Never Grow Up (Philadelphia)\n21. Broken Gondola Songs - [Our Song / Wildest Dreams],\nTreacherous right b-stage (Philadelphia)\n22. Babe [Guitar] (Cleveland)\n23. Welcome to New York (East Rutherford)\n24. Fearless [b-stage],\nClean [Piano before Long Live / NYD]\n(East Rutherford Rain Show)\n25. Enchanted (East Rutherford minor rain show)\n26. 22 (Foxborough)\n27. Change (Foxborough)\n28. Ours (Foxborough)\n29. Out of the Woods (Toronto)\n30. Come Back... Be Here (Toronto)\n31. A Place In This World (Pittsburgh)\n32. This Love (Atlanta)\n33. The Lucky One (Atlanta)\n34. Invisible (Tampa)\n35. Breathe (Miami)\n36. Better Man [b-stage]\n Tim McGraw [with Faith Hill and Tim McGraw] (Nashville)\n37. Jump Then Fall (Detroit)\n38. Begin Again (Minneapolis)\n39. Tied Together With A Smile (Minneapolis)\n40. The Story of Us (Kansas City)\n41. Forever and Always (Indianapolis)\n42. Hey Stephen (St. Louis)\n43. Speak Now (New Orleans)\n44. Wonderland (Houston)\n45. White Horse (Dallas)\n46. All Too Well (Dallas)\n47. I Knew You Were Trouble (Perth minor rain show)\n48. I'm Only Me When I'm With You (Melbourne)\n49. 22 (Sydney rain show / skipped DWOHT)\n50. Starlight (Brisbane)\n51. Out Of The Woods (Auckland)\n52. I Know Places (Tokyo)\n53. Wildest Dreams (Tokyo)")).catch(() => {
            message.channel.send(failEmbed.setDescription("It appears that I was unable to send the DM, possibly because you have your DM's disabled?"));
        });
    }
}

module.exports = repSecretSongCommand;