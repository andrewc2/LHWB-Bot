const { Listener } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class memberLeaveListener extends Listener {
	constructor() {
		super("memberLeave", {
			event: "guildMemberRemove",
			emitter: "client",
		});
	}

	exec(member) {
        const embed = new MessageEmbed()
            .setColor("#FF69B4")

		let joinDate = member.joinedAt;
        let now = new Date();
        let joinTime = (now.getTime() - joinDate.getTime()) / 1000;
        if (joinTime < 300 && member.guild.id !== "115332333745340416") {
			if (member.guild.systemChannelId === null){
				console.log("Member left but no system channel");
				return;
			}			
            member.guild.systemChannel.send({ embeds: [embed.setDescription(`${member.user.username} has already left us. <:osad:692120291798941887>`)] });
	    }
    }
}

module.exports = memberLeaveListener;
