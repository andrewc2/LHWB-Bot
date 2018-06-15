const Discord = require("discord.js");
const mysql = require("mysql");

const config = require("./authmain.json");
const stan = require ("./media.json");

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

        case "!lversion":
            versionCommand(message);
            break;

        case "!lrestart":
            if(isMod(message))
                restartCommand(message);
            break;
            
        case "!tracks":
            trackCommand(message);
            break;

        /* case "!stan":
            stanCommand(message);
            break; */
            
        case "!gif":
            gifCommand(message);
            break;

        case "!uh":
            huhCommand(message);
            break;
            
        case "!eyeroll":
            eyerollCommand(message);
            break;
            
        case "!taylorswift":
            albumDebutCommand(message);
            break;
                
        case "!fearless":
            albumFearlessCommand(message);
            break;
            
        case "!speaknow":
            albumSpeakNowCommand(message);
            break;
            
        case "!red":
            albumRedCommand(message);
            break;
            
        case "!1989":
            album1989Command(message);
            break;
            
        case "!reputation":
            albumReputationCommand(message);
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
    /* let reply = stan['stans'];
    message.channel.send(reply[Math.floor(Math.random() * reply.length)]); */
    message.channel.send(`This command has been disabled due to DMCA by mods pending resolution`);
}

function gifCommand(message) {
    let reply = stan['gif'];
    message.channel.send(reply[Math.floor(Math.random() * reply.length)]);
}


function trackCommand(message) {
	message.reply("https://lhwb.tay.rocks/lhwb.php");
}

function huhCommand(message) {
	message.reply(`huh`);
}

function eyerollCommand(message) {
	message.channel.send(`:rolling_eyes:`);
}

function albumDebutCommand(message) {
	message.channel.send({embed: {
        description: "**Taylor Swift** was released on __October 24, 2006__ \n\n1. Tim McGraw\n2. Picture to Burn\n3. Teardrops on My Guitar\n4. A Place in This World\n5. Cold as You\n6. The Outside\n7. Tied Together with a Smile\n8. Stay Beautiful\n9. Should've Said No\n10. Mary's Song (Oh My My My)\n11. Our Song\n\n__Deluxe Version__\n12. I'm Only Me When I'm with You\n13. Invisible\n14. A Perfectly Good Heart",
        color: 568027,
        thumbnail: {
            url: "https://i.imgur.com/w0bksSN.jpg"
        },
        author: {
            name: "Taylor Swift",
            url: "https://taylorswift.com/releases/#/release/2812",
            icon_url: "https://red.ghst.in/ts.png"
        }
    }});
}

function albumFearlessCommand(message) {
	message.channel.send({embed: {
        description: "**Fearless** was released on __November 11, 2008__ \n\n1. Fearless\n2. Fifteen\n3. Love Story\n4. Hey Stephen\n5. White Horse\n6. You Belong with Me\n7. Breathe (featuring Colbie Caillat)\n8. Tell Me Why\n9. You're Not Sorry\n10. The Way I Loved You\n11. Forever and Always\n12. The Best Day\n13. Change\n\n__Platinum Edition Tracks:__\nJump Then Fall\nUntouchable\nCome in with the Rain\nSuperstar\nThe Other Side of the Door\nForever And Always (Piano Version)",
        color: 14929032,
        thumbnail: {
            url: "https://i.imgur.com/TPL7mge.jpg"
        },
        author: {
            name: "Taylor Swift",
            url: "https://taylorswift.com/releases/#/release/2822",
            icon_url: "https://red.ghst.in/ts.png"
        }
    }});
}

function albumSpeakNowCommand(message) {
	message.channel.send({embed: {
        description: "**Speak Now** was released on __October 25, 2010__ \n\n1. Mine\n2. Sparks Fly\n3. Back to December\n4. Speak Now\n5. Dear John\n6. Mean\n7. The Story of Us\n8. Never Grow Up\n9. Enchanted\n10. Better Than Revenge\n11. Innocent\n12. Haunted\n13. Last Kiss\n14. Long Live\n\n__Deluxe Version__\n15. Ours\n16. If This Was A Movie\n17. Superman",
        color: 6892915,
        thumbnail: {
            url: "https://i.imgur.com/TNKbt8Y.jpg"
        },
        author: {
            name: "Taylor Swift",
            url: "https://taylorswift.com/releases/#/release/2832",
            icon_url: "https://red.ghst.in/ts.png"
        }
    }});
}

function albumRedCommand(message) {
	message.channel.send({embed: {
        description: "**Red** was released on __October 22, 2012__ \n\n1. State of Grace\n2. Red\n3. Treacherous\n4. I Knew You Were Trouble.\n5. All Too Well\n6. 22\n7. I Almost Do\n8. We Are Never Ever Getting Back Together\n9. Stay Stay Stay\n10. The Last Time (featuring Gary Lightbody)\n11. Holy Ground\n12. Sad Beautiful Tragic\n13. The Lucky One\n14 Everything Has Changed (featuring Ed Sheeran)\n15. Starlight\n16. Begin Again\n\n__Deluxe Version__\n17. The Moment I Knew\n18. Come Back... Be Here\n19. Girl At Home",
        color: 11476553,
        thumbnail: {
            url: "http://i.imgur.com/as6dlgi.jpg"
        },
        author: {
            name: "Taylor Swift",
            url: "https://taylorswift.com/releases/#/release/7301",
            icon_url: "https://red.ghst.in/ts.png"
        }
    }});
}

function album1989Command(message) {
	message.channel.send({embed: {
        description: "**1989** was released on __October 27, 2014__ \n\n1. Welcome to New York\n2. Blank Space\n3. Style\n4. Out of the Woods\n5. All You Had to Do Was Stay\n6. Shake It Off\n7. I Wish You Would\n8. Bad Blood\n9. Wildest Dreams\n10. How You Get the Girl\n11. This Love\n12. I Know Places\n13. Clean\n\n__Deluxe Version__\n14. Wonderland\n15. You Are In Love\n16. New Romantics",
        color: 13484710,
        thumbnail: {
            url: "https://i.imgur.com/i1QDoZR.jpg"
        },
        author: {
            name: "Taylor Swift",
            url: "https://taylorswift.com/releases/#/release/12453",
            icon_url: "https://red.ghst.in/ts.png"
        }
    }});
}

function albumReputationCommand(message) {
	message.channel.send({embed: {
        description: "**reputation** was released on __November 10, 2017__ \n\n1. ...Ready For It\n2. End Game (ft. Ed Sheeran and Future)\n3. I Did Something Bad\n4. Don't Blame Me\n5. Delicate\n6. Look What You Made Me Do\n7. So It Goes...\n8. Gorgeous\n9. Getaway Car\n10. King Of My Heart\n11. Dancing With Our Hands Tied\n12. Dress\n13. This Is Why We Can't Have Nice Things\n14. Call It What You Want\n15. New Year's Day",
        color: 12040119,
        thumbnail: {
            url: "https://i.imgur.com/o2v3b7E.jpg"
        },
        author: {
            name: "Taylor Swift",
            url: "https://taylorswift.com/releases/#/release/15193",
            icon_url: "https://red.ghst.in/ts.png"
        }
    }});
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
