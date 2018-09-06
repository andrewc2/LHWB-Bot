const Discord = require("discord.js");

module.exports = {
	name: "template",
	description: "Template command.",
	execute(lhwb, message, params) {
		message.channel.send("Template command.");
	},
};
