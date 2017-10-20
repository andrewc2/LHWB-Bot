const Discord = require("discord.js");
const config = require("./auth.json");
const mysql = require("mysql");

const bot = new Discord.Client();

var db = mysql.createPool({
	host: config.sql.host,
	user: config.sql.user,
	password: config.sql.pass,
	database: config.sql.db
});

bot.on("ready", () => {
	console.log(time() + " LHWB is ready!");
});

var firstJoin = true;

bot.on("message", message => {
	var command = message.content.split(" ");
	var params = command.slice(1, command.length).join(" ");

		switch(command[0].toLowerCase()) {
			case "!lversion":
				versionCommand(message);
				break;

			case "!lrestart":
				restartCommand(message);
				break;
                
            case "!tracks":
				trackCommand(message);
				break;
                
            case "!uh":
				huhCommand(message);
				break;
            
            case "!lrequest":
				requestCommand(message, params);
				break;
            
			case "!ljoin":
				join(message, params);
				break;

			case "!lleave":
				leave(message);
				break;
			//temporary command to aid the re-write
			case "!eval":
            	if (message.author.id == config.discord.ownerID) {
                	if (command[1] == null) {
                    	message.reply ("You have not specified what you want me to evaluate! :(");
                	} else {
                    	try {
                        	var evaled = eval(params);
                        	if (typeof evaled !== "string")
                            	evaled = require("util").inspect(evaled);
                            	message.channel.send("```xl\n" + clean(evaled) + "\n```");
	                    } catch (err) {
    	                    message.channel.send("`ERROR` ```xl\n" + clean(err) + "\n```");
        	            }
            	    }
            	} else {
                	message.reply("lol no :rolling_eyes:");
            	}
            	break;
		}
});

function clean(text) {
    if (typeof(text) === "string") {
        return text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
        return text;
    }
}

function join(message, channelName) {
	//todo: catch err
	bot.channels.find("name", channelName).join();
	//tests
	message.reply("joined " + channelName + " successfully!");
	console.log(time() + " LHWB joined " + channelName + " by " + message.author.tag + ".");
}

function leave(message) {
	//checks to see if the bot is in a voice channel
	var voiceConnection = bot.voiceConnections.get(message.guild.id);
	//todo:catch err
	if(voiceConnection != null)
		voiceConnection.disconnect();
	//tests
	message.reply("successfully left Red");
	console.log(time() + " LHWB left " + message.channel.name + " by " + message.author.tag + ".");
}

function trackCommand(message) {
	message.reply("https://lhwb.tay.rocks/lhwb.php");
}

function huhCommand(message) {
	message.reply("huh");
}

function requestCommand(message, req) {
    var user = message.author.username;
    console.log(user + " - " + req);
    db.query("INSERT INTO requested (user, request) VALUES (?,?)", [user,req]);
	message.reply("Request submitted.");
}

function versionCommand(message) {
	message.channel.send("Running version: " + config.bot.version);
}

function restartCommand(message) {
    //todo: leave voice channel before restarting
    message.channel.send("LHWB restarting!").then(() => process.exit(-1));
}

function time() {
    var date = new Date();
    var time = date.toLocaleString();
    return time;
}

bot.login(config.bot.token);
