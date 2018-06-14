const Discord = require("discord.js");
const mysql = require("mysql");

const config = require("./auth.json");
const stan = require ("./stan.json");

const bot = new Discord.Client();

let db = mysql.createPool({
	host: config.sql.host,
	user: config.sql.user,
	password: config.sql.pass,
	database: config.sql.db
});

bot.on("ready", () => {
	console.log(`${time()} - LHWB non-music is ready!`);
});

bot.on("message", message => {
    let command = message.content.split(" ");
    let params = command.slice(1, command.length).join(" ");

    // If Patootie's message contains the word oof at least once, and it is not in #bots, the counter will increment by one.
    if(message.content.match(/oof/i) && message.author.id == config.discord.patootie && message.channel.id != config.discord.botsChannel)
        updateOofCounter(message);
    
    switch(command[0].toLowerCase()) {
        case "!debtcounter":
            getOofCounter(message);
            break;

        case "!lnversion":
			versionCommand(message);
            break;

        case "!lnrestart":
            if(isMod(message))
                restartCommand(message);
            break;

        case "!stan":
            stanCommand(message);
            break;

        case "!uh":
			huhCommand(message);
            break;
            
        case "!eyeroll":
			eyerollCommand(message);
			break;
    }
});

function isMod(message) {
    return (message.member.roles.has("115333509580718080") || message.member.roles.has("115334158892531719") ||
            message.author.id == config.discord.fs || message.author.id == config.discord.iandrewc || message.author.id == config.discord.neonz);
}

function updateOofCounter(message) {
    db.query("SELECT * FROM counters WHERE word='oof' AND userID=?", [config.discord.patootie], function(err, rows) {
        if (rows[0] != null) {
            rows[0].counter++;
            db.query("UPDATE counters SET counter=counter+1, lastUsed=CURRENT_TIMESTAMP WHERE word='oof' AND userID=?", [config.discord.patootie]);
        }
    });
}

function getOofCounter(message) {
    let command = message.content.split(" ");

    db.query("SELECT * FROM counters WHERE word='oof'", function(err, rows) {
        if(rows[0] == null) {
           message.reply(`there was an error retrieving the oof counter.`);
        } else {
            message.reply(`${rows[0]['user']}'s \`oof\` counter is at \`${rows[0]['counter']}\` as of \`${rows[0]['lastUsed']}\`.`);
        }
    });
}

function stanCommand(message) {
    let reply = stan['media'];
    message.channel.send(reply[Math.floor(Math.random() * reply.length)]);
}

function huhCommand(message) {
	message.reply(`huh`);
}

function eyerollCommand(message) {
	message.channel.send(`:rolling_eyes:`);
}

function versionCommand(message) {
	message.channel.send(`Running version: ${config.bot.version}`);
}

function restartCommand(message) {
    //todo: leave voice channel before restarting
    message.channel.send(`LHWB non-music restarting!`).then(() => process.exit(-1));
}

function time() {
    var date = new Date();
    var time = date.toLocaleString();
    return time;
}

bot.login(config.bot.token);