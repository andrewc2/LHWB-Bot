const Discord = require("discord.js");
const mysql = require("mysql");
const lfmAPI = require("lastfmapi");

const config = require("./authmain.json");
const stan = require ("./media.json");

const bot = new Discord.Client();

let db = mysql.createPool({
	host: config.sql.host,
	user: config.sql.user,
	password: config.sql.pass,
	database: config.sql.db,
    charset: "utf8mb4"
});

bot.on("ready", () => {
	console.log(`${time()} - LHWB non-music is ready!`);
});

bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));

bot.on("disconnect", function(err, event) {
    
    // if (event.code === 1006) {
    //     console.log(time() + ' -- Bot Disconnected from Discord with code' + event + ' for reason: ' + err + ' -- Restarting --');
    //     //  let pm2 deal with it
    //     client.destroy().then(process.exit());
    // }
    console.log(time() + ' -- Bot Disconnected from Discord with code' + event + ' for reason: ' + err + ' --');
});

bot.on("message", message => {
    let command = message.content.split(" ");
    let params = command.slice(1, command.length).join(" ");
    const param2 = message.content.slice(config.bot.prefix.length).split(/ +/g);

    // If Patootie's message contains the word oof at least once, and it is not in #bots, the counter will increment by one.
    if(message.content.match(/oof/i) && message.author.id == config.discord.patootie && message.channel.id != config.discord.botsChannel)
        updateOofCounter(message);
    
    /* if (message.content === '!q egg' || message.content === '!q 🥚') {
        updateEggCounter(message);
        message.author.send("here's your hint https://www.youtube.com/watch?v=Smwrw4sNCxE");
    } */
    
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
        
        case "!ldelete":
            if(isMod(message))
                deleteCommand(message, params);
            break;
        
        case "!ltest":
            if(isMod(message))
                testPermissionsCommand(message);
            break;
           
        case "!lsay":
            if(isMod(message))
                lsayCommand(message, command);
            break;
               
        case "!lfm":
            lfmCommand(message, params, param2);
            break;
            
        case "!tracks":
            trackCommand(message);
            break;
            
        case "!lhelp":
            helpCommand(message);
            break;
        
        case "!livestream":
        case "!stream":
            liveStreamCommand(message);
            break;

        case "!countdown":
            ts7CountdownCommand(message);
            break;

        /* case "!stan":
            stanCommand(message);
            break; */
            
        case "!gif":
            gifCommand(message);
            break;
        
        case "!wtny":
            wtnyCommand(message);
            break;

        case "!uh":
            huhCommand(message);
            break;
            
        case "!secretsong":
        case "!secretsongs":
        case "!ss":
            secretSongCommand(message);
            break;
            
        case "!repss":
            repFullSecretSongCommand(message);
            break;
                  
        case "!repsetlist":
            repSetlistCommand(message);
            break;
                  
        case "!repguests":
            repGuestsCommand(message);
            break;
                
        case "!eyeroll":
            eyerollCommand(message);
            break;
            
        case "!taylorswift":
        case "!debut":
            albumDebutCommand(message);
            break;
            
        case "!beautifuleyes":
            albumBeautifulEyesCommand(message);
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
                  
        case "!lover":
            albumLoverCommand(message);
            break;
        
        case "!queue":
        case "!q":
            if(message.channel.id == "132026417725702145" || isMod(channelID,userID)) { //check if user is in bots or mod
                queueSong(message, command, params);
            }
            break;

        case "!current":
            currentCommand(message);
            break;
                    
        case "!recent":
        case "!recentlyplayed":
            recentlyPlayedCommand(message);
            break;
      
        case "!dq":
        case "!dequeue":
            removeQueue(message, params);
            break;
        
        case "!rankplays":
            rankPlaysCommand(message, params);
            break;
               
        /* case "!lottethinking":
            lotteCommand(message);
            break; */
        default:
            checkTable(message);
                
    }
});

function isMod(message) {
    if (message.guild != null)
        return (message.member.roles.has("115333509580718080") || message.member.roles.has("115334158892531719") || message.author.id == config.discord.fs || message.author.id == config.discord.iandrewc);
    else
        return (message.author.id == config.discord.fs || message.author.id == config.discord.iandrewc);
}

/* function updateEggCounter(message) {
    db.query("UPDATE counters SET counter=counter+1, lastUsed=CURRENT_TIMESTAMP WHERE word='egg'");
    db.query("INSERT INTO eggs (user, userID) VALUES (?,?)", [message.author.username, message.author.id]);
} */

function updateOofCounter(message) {
    db.query("UPDATE counters SET counter=counter+1, lastUsed=CURRENT_TIMESTAMP WHERE word='oof' AND userID=?", [config.discord.patootie]);
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

/*function stanCommand(message) {
     let reply = stan['stans'];
    message.channel.send(reply[Math.floor(Math.random() * reply.length)]); 
    message.channel.send(`Honestly I'd rather not see stan drama in here but it is what it is...`);
}*/

function gifCommand(message) {
    let reply = stan['gif'];
    message.channel.send(reply[Math.floor(Math.random() * reply.length)]);
}

function trackCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor("LosingHimWasBlue TrackList", bot.user.avatarURL)
        .setDescription("The full requestable track list is here: https://lhwb.tay.rocks/lhwb.php");

    message.channel.send({embed});
}

function helpCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor("LosingHimWasBlue Commands", bot.user.avatarURL)
        .setDescription("The full command list is available here: https://lhwb.tay.rocks/");

    message.channel.send({embed});
}

function lotteCommand(message) {
	message.channel.send("https://i.imgur.com/TH0HzSs.png");
}

function huhCommand(message) {
	message.reply(`huh`);
}

function wtnyCommand(message) {
	message.channel.send({files: ["https://i.imgur.com/02RxUF4.gif"]});
}

function eyerollCommand(message) {
	message.channel.send(`:rolling_eyes:`);
}

function checkTable(message) {
	var table = "\t┳━┳ ヽ( ಠل͜ಠ)ﾉ";
	var t = message.content.toLowerCase().indexOf("┻"); 
	var differentTableLegs = ["┻", "╝","╘","╙","╨","└"];
	for(var i = 0;i< differentTableLegs.length;i++) {
		if(message.content.toLowerCase().indexOf(differentTableLegs[i]) > -1) {
			//message.channel.send({files: ["https://i.imgur.com/CRSa6W2.png"]});
            message.channel.send(table);
            
            //const embed = new Discord.MessageEmbed()
                //.setColor(message.member.displayHexColor)
                //.setDescription(table);

            //message.channel.send({embed});
			//addFlip();
			break;
		}
	}
}

function liveStreamCommand(message) {
	message.channel.send({embed: {
        description: "[HLS Player 1](https://speaknow.rocks:1989/)\n[Alt Player 2](https://speaknow.rocks:1989/hls.html)\n[Alt Player 3](https://speaknow.rocks:1989/flow.html)\n\n**SSL ENABLED 👌**\nStream will be minimum 30sec behind from live\nIf you have issues please refresh your browser first.\n\nPlease do not share this stream outside of this discord server.",
        color: 5218488,
        author: {
            name: "Live Stream",
            url: "https://speaknow.rocks:1989/player/",
            icon_url: "https://red.ghst.in/ts.png"
        }
    }});
}

function repFullSecretSongCommand(message) {
    message.author.send({embed: {
        description: "1. All Too Well (Glendale)\n2. Wildest Dreams (Santa Clara)\n3. The Best Day (Santa Clara)\n4. Red (Pasadena)\n5. All Too Well (Pasadena)\n6. Holy Ground (Seattle)\n7. Teardrops on My Guitar (Denver)\n8. Our Song (Chicago)\n9. 22 (Chicago)\n10. I Knew You Were Trouble (Manchester)\n11. I Don't Wanna Live Forever (Manchester)\n12. Mean (Dublin)\n13. How You Get The Girl (Dublin)\n14. So It Goes...(London)\n15. Fifteen (London)\n16. Mine (Louisville)\n17. Sparks Fly (Columbus)\n18. State of Grace (DC)\n19. Haunted (DC)\n20. Never Grow Up (Philadelphia)\n21. Broken Gondola Songs - [Our Song / Wildest Dreams],\nTreacherous right b-stage (Philadelphia)\n22. Babe [Guitar] (Cleveland)\n23. Welcome to New York (East Rutherford)\n24. Fearless [b-stage],\nClean [Piano before Long Live / NYD]\n(East Rutherford Rain Show)\n25. Enchanted (East Rutherford minor rain show)\n26. 22 (Foxborough)\n27. Change (Foxborough)\n28. Ours (Foxborough)\n29. Out of the Woods (Toronto)\n30. Come Back... Be Here (Toronto)\n31. A Place In This World (Pittsburgh)\n32. This Love (Atlanta)\n33. The Lucky One (Atlanta)\n34. Invisible (Tampa)\n35. Breathe (Miami)\n36. Better Man [b-stage]\n Tim McGraw [with Faith Hill and Tim McGraw] (Nashville)\n37. Jump Then Fall (Detroit)\n38. Begin Again (Minneapolis)\n39. Tied Together With A Smile (Minneapolis)\n40. The Story of Us (Kansas City)\n41. Forever and Always (Indianapolis)\n42. Hey Stephen (St. Louis)\n43. Speak Now (New Orleans)\n44. Wonderland (Houston)\n45. White Horse (Dallas)\n46. All Too Well (Dallas)\n47. I Knew You Were Trouble (Perth minor rain show)\n48. I'm Only Me When I'm With You (Melbourne)\n49. 22 (Sydney rain show / skipped DWOHT)\n50. Starlight (Brisbane)\n51. Out Of The Woods (Auckland)\n52. I Know Places (Tokyo)\n53. Wildest Dreams (Tokyo)",
        color: 568027,
        thumbnail: {
            url: "https://i.imgur.com/Zhg0oXF.jpg"
        },
        author: {
            name: "Secret Songs",
            url: "https://docs.google.com/spreadsheets/d/1Yt0_VqcPczB9GxKf9BGCpNcSWXTROlpdrEcTP1wmevs/edit",
            icon_url: "https://red.ghst.in/ts.png"
        }
    }});
}

 function secretSongCommand(message) {
    message.channel.send({embed: {
        description: "As the tour is now over, !ss is sunsetting please use !repSS to get a PM of the full list.\nSoon I will be working on adding previous tour info, guests etc.",
        color: 568027,
        thumbnail: {
            url: "https://i.imgur.com/Zhg0oXF.jpg"
        },
        author: {
            name: "Secret Songs",
            url: "https://docs.google.com/spreadsheets/d/1Yt0_VqcPczB9GxKf9BGCpNcSWXTROlpdrEcTP1wmevs/edit",
            icon_url: "https://red.ghst.in/ts.png"
        }
    }});
}

function repSetlistCommand(message) {
    message.channel.send({embed: {
        description: "Before Taylor: Bad Reputation\n\nreputation Video\n\n1. ...Ready for It?\n2. I Did Something Bad\n3. Gorgeous\n4. Style / Love Story / You Belong With Me\n\nLook What You Made Me Do Video\n\n5. Look What You Made Me Do\n6. End Game (no verses)\n7. King of My Heart\n8. Delicate (flying to bstage)\n9. Shake It Off (left bstage)\n10. Dancing With Our Hands Tied [Exchanges with So It Goes...] (left bstage)\n11. !secretsong (left bstage)\n12. Blank Space (right bstage)\n13. Dress (right bstage)\n14. Bad Blood / Should've Said No\n15. Don't Blame Me\n16. Long Live / New Year's Day\n\nWhy She Disappeared video\n\n17. Getaway Car\n18. Call It What You Want\n19. We Are Never Ever Getting Back Together / This Is Why We Can't Have Nice Things",
        color: 568027,
        thumbnail: {
            url: "https://i.imgur.com/Zhg0oXF.jpg"
        },
        author: {
            name: "Typical Setlist",
            url: "https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=3d0a56f",
            icon_url: "https://red.ghst.in/ts.png"
        }
    }});
}

function repGuestsCommand(message) {
    message.channel.send({embed: {
        description: "5-18-18 (Pasadena) There's Nothing Holdin' Me Back - Shawn Mendes\n5-19-18 (Pasadena) My My My! - Troye Sivan; Hands to Myself - Selena Gomez\n6-22-18 (London) Slow Hands - Niall Horan\n6-23-18 (London) Angels - Robbie Williams\n7-27-18 (Foxborough) Curious - Hayley Kiyoko\n8-04-18 (Toronto) Summer of 69 - Bryan Adams\n8-25-18 (Nashville) Tim McGraw - Faith Hill / Tim McGraw\n10-5-18 (Dallas) The Middle - Maren Morris\n10-6-18 (Dallas) Sugarland - Babe [full production]",
        color: 568027,
        thumbnail: {
            url: "https://i.imgur.com/Zhg0oXF.jpg"
        },
        author: {
            name: "Special Guests",
            url: "https://en.wikipedia.org/wiki/Taylor_Swift%27s_Reputation_Stadium_Tour#Shows",
            icon_url: "https://red.ghst.in/ts.png"
        }
    }});
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

function albumBeautifulEyesCommand(message) {
	message.channel.send({embed: {
        description: "**Beautiful Eyes** was released on __July 15, 2008__ \n\n1. Beautiful Eyes\n2. Should've Said No (Alternate version)\n3. Teardrops on My Guitar (Acoustic version)\n4. Picture to Burn (Radio edit)\n5. I'm Only Me When I'm with You\n6. I Heart ?\n\n__Disk Two (DVD)__\n1. Beautiful Eyes (music video)\n2. Picture to Burn (music video)\n3. I'm Only Me When I'm with You (music video)\n4. Tim McGraw (music video)\n5. Teardrops on My Guitar (Pop version music video)\n6. Our Song (music video)\n7. Making of 'Picture to Burn' Video\n8. GAC New Artist Interview\n9. 2008 ACM Awards Performance of 'Should've Said No",
        color: 0xe78234,
        thumbnail: {
            url: "https://i.imgur.com/sN5DToG.jpg"
        },
        author: {
            name: "Taylor Swift",
            url: "https://en.wikipedia.org/wiki/Beautiful_Eyes",
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
        description: "**reputation** was released on __November 10, 2017__ \n\n1. ...Ready For It?\n2. End Game (ft. Ed Sheeran and Future)\n3. I Did Something Bad\n4. Don't Blame Me\n5. Delicate\n6. Look What You Made Me Do\n7. So It Goes...\n8. Gorgeous\n9. Getaway Car\n10. King Of My Heart\n11. Dancing With Our Hands Tied\n12. Dress\n13. This Is Why We Can't Have Nice Things\n14. Call It What You Want\n15. New Year's Day",
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

function albumLoverCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(15651566)
        .setAuthor("Taylor Swift", "https://red.ghst.in/ts.png")
        .setThumbnail("https://i.imgur.com/cNnUR0M.jpg")
        .setFooter("(18 Tracks)")
        .setDescription("**Lover** was released on __August 23, 2019__ \n\n1. I Forgot That You Existed\n2. Cruel Summer\n3. Lover\n4. The Man\n5. The Archer\n6. I Think He Knows\n7. Miss Americana & The Heartbreak Prince\n8. Paper Rings\n9. Cornelia Street\n10. Death By A Thousand Cuts\n11. London Boy\n12. Soon You'll Get Better (ft. Dixie Chicks)\n13. False God\n14. You Need To Calm Down\n15. Afterglow\n16. ME! (ft. Brendon Urie)\n17. It's Nice To Have A Friend\n18. Daylight");

    message.channel.send({embed});

}

function versionCommand(message) {
	message.channel.send({embed: {
        description: `${config.bot.patchnotes}`,
        title: "Patch Notes:",
        color: 5218488,
        author: {
            name: `Version: ${config.bot.version}`,
            url: "https://lhwb.tay.rocks/",
            icon_url: "https://red.ghst.in/ts.png"
        }
    }});
}

function deleteCommand(message, params) {
    //message.channel.fetchMessage(params).delete();
}

function testPermissionsCommand(message) {
    //message.channel.fetchMessage(params).delete();
    //console.log(message.channel.permissionsFor("182878095919939584"));
    //console.log(message.guild.channels);
}

function lsayCommand(message, command)
{
    try {
        let params = command.slice(2, command.length).join(" ");
        //console.log("2nd Params: " + params);
        bot.channels.get(command[1]).send(params);
    }
    catch (err) {
            console.log(`${time()} - ${err}`);
            const embed = new Discord.MessageEmbed()
                .setColor(16711680)
                .setDescription(`Uh oh! Looks like you sent a message to an invalid channel id. I might not be in that server?`);

            message.author.send({embed});
        }
}

//variables for handling the countdown anti-spam coolodown
const countdownCooldownMS = 120 * 1000;
let lastCountdownUsage = Date.now() - countdownCooldownMS;
let cooldownMsgSent = false;

function ts7CountdownCommand(message)
{
    /* if (lastCountdownUsage > Date.now() - countdownCooldownMS) {
        if(cooldownMsgSent != true) {
            const embed = new Discord.MessageEmbed()
                .setColor(16711680)
                .setDescription(`Please do not spam countdown, it will be available again in 2 minutes`);

            message.channel.send({ embed });
            cooldownMsgSent = true;
            return;
        } else
            return;
    } */

    lastCountdownUsage = Date.now();

    let end = new Date('10/28/2019 8:00 PM');
    let end2 = new Date('10/29/2019 8:00 PM');
    let end3 = new Date('10/30/2019 4:00 PM');

    //11/04/2019 8:00PM The Voice Mega Mentor N3
    //11/05/2019 8:00PM The Voice Mega Mentor N4
    //11/06/2019 Japan Promo Event
    //11/11/2019 China Promo Event
    //12/13/2019 z100 Jingle Ball (Streamed)
    //12/20/2019 Cats Movie Releases

    let _second = 1000;
    let _second2 = 1000;
    let _second3 = 1000;
    let _minute = _second * 60;
    let _minute2 = _second * 60;
    let _minute3 = _second * 60;
    let _hour = _minute * 60;
    let _hour2 = _minute * 60;
    let _hour3 = _minute * 60;
    let _day = _hour * 24;
    let _day2 = _hour * 24;
    let _day3 = _hour * 24;
    let timer;

    let now = new Date();
    let distance = end - now;
    let distance2 = end2 - now;
    let distance3 = end3 - now;
    /* if (distance < 0) {
        clearInterval(timer);
        const embed = new Discord.MessageEmbed()
            .setColor(14381275)
            .setDescription(`There is no active countdown.`);

        message.channel.send({ embed });
        return;
    } */

    let days = Math.floor(distance / _day);
    let days2 = Math.floor(distance2 / _day2);
    let days3 = Math.floor(distance3 / _day3);
    let hours = Math.floor((distance % _day) / _hour);
    let hours2 = Math.floor((distance2 % _day2) / _hour2);
    let hours3 = Math.floor((distance3 % _day3) / _hour3);
    let minutes = Math.floor((distance % _hour) / _minute);
    let minutes2 = Math.floor((distance2 % _hour2) / _minute2);
    let minutes3 = Math.floor((distance3 % _hour3) / _minute3);
    let seconds = Math.floor((distance % _minute) / _second);
    let seconds2 = Math.floor((distance2 % _minute2) / _second2);
    let seconds3 = Math.floor((distance3 % _minute3) / _second3);

    const embed = new Discord.MessageEmbed()
        .setColor(16711680)
        .setTitle(`Lover Countdowns`)
        .setURL(`https://taylorswift.com`)
        .setDescription("The Voice Mega Mentor N1 - 10/28 8PM EST\n" + days + " Days " + hours + " Hours " + minutes + " Minutes " + seconds + " Seconds\n\nThe Voice Mega Mentor N2 - 10/29 8PM EST\n" + days2 + " Days " + hours2 + " Hours " + minutes2 + " Minutes " + seconds2 + " Seconds\n\nBBC Documentary - 10/30 Time unknown\n" + days3 + " Days " + hours3 + " Hours " + minutes3 + " Minutes " + seconds3 + " Seconds");
        //.setDescription("Lover Fest West N1 - 7/25/20\n" + days + " Days " + hours + " Hours " + minutes + " Minutes " + seconds + " Seconds\n\nLover Fest West N2 - 7/25/20\n" + days2 + " Days " + hours2 + " Hours " + minutes2 + " Minutes " + seconds2 + " Seconds");
    
    message.channel.send({embed});
    cooldownMsgSent = false;
}

function lfmCommand(message, params, param2) {
    const lfm = new lfmAPI({
        api_key : config.lastfm.lfmAPIKey,
        secret  : config.lastfm.lfmAPISecret
    });

    function fetchFM(message, target) {
        lfm.user.getRecentTracks({
            limit : 2,
            user  : target
        }, function (err, recentTracks) {
            if (err) { console.log(err); }
            try {
                let nowPlaying = false;
                let status = "";
                try {
                    if (recentTracks.track[0]["@attr"].nowplaying) {
                        nowPlaying = true;
                    }
                } catch (undef) { // undefined
                    console.log(undef);
                }

                switch (nowPlaying) {
                    case true:
                        status = "Current";
                        break;
                    case false:
                        status = "Most Recent";
                        break;
                }
                const embed = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setAuthor(target, `https://i.imgur.com/x5AhTlq.png`, `https://www.last.fm/user/${recentTracks["@attr"].user}`)
                    .addField(`${status} Song`, `${recentTracks.track[0].name}`, true)
                    .addField(`${status} Artist`, `${recentTracks.track[0].artist["#text"]}\u200B`, true)
                    .addField("Previous Song", `${recentTracks.track[1].name}`, true)
                    .addField("Previous Artist", `${recentTracks.track[1].artist["#text"]}`, true)
                    .setThumbnail(`${recentTracks.track[0].image[3]["#text"]}`);
                    if(nowPlaying) {
                        embed.setFooter(`Total Scrobbles: ${recentTracks["@attr"].total} - Currently Scrobbling`);
                    } else {
                        embed.setFooter(`Total Scrobbles: ${recentTracks["@attr"].total} - Last scrobbled on: ${recentTracks.track[0].date["#text"]} (UTC)`);
                    }
                message.channel.send({embed});
                console.log("Track 0: " + recentTracks.track[0].name);
                console.log("Track 1: " + recentTracks.track[1].name);
                console.log(`${recentTracks.track[0].image[3]["#text"]}`);
                
            } catch (unf) { // user not found
                console.log(unf);              
                const embed = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setDescription(`${target} is either not a last.fm user, has not scrobbled any songs yet, or the API is down, try again later if the user is definitely correct!`);

                message.channel.send({embed});
            }
        });
    }
    if (param2[1] == null) {
        db.query("SELECT * FROM lastfm WHERE discordID=?", [message.author.id], function(err, rows) {
            if (rows[0] == null) {
                const embed = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setDescription(`Uh oh! Looks like you have not saved your last.fm username.\nYou can set it by typing \`!lfm set <username>\`.`);

                message.channel.send({embed});
            } else {
                fetchFM(message, rows[0]['lastfmUsername']);
            }
        });
    } else if (param2[1] == "-h" || param2[1] == "--help") {
        const embed = new Discord.MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor(`!lfm help`, bot.user.avatarURL)
        .setDescription(`All availble parameters are listed below. \n`)
        .addField(`no parameters`, `If you have set your last.fm username, it will post an embed of your profile.`)
        .addField(`@mention`, `Usage: \`!lfm @user\`\nPosts an embed of the user's last.fm profile you mentioned if they have set it.`)
        .addField(`clear`, `Usage: \`!lfm clear\`\nClears your last.fm username from the database.`)
        .addField(`search`, `Usage: \`!lfm search <username>\`\nSearches last.fm for the username provided. No mentions needed!`)
        .addField(`set`, `Usage: \`!lfm set <username>\`\nSaves your last.fm username to the database for use with various parameters.`)
        .setFooter(`Page 1 / 1`);

        message.channel.send({embed});
    } else if (param2[1] == "clear") {
        db.query("DELETE FROM lastfm WHERE discordID=?", [message.author.id]);
        const embed = new Discord.MessageEmbed()
            .setColor(message.member.displayHexColor)
            .setDescription(`Your last.fm username has been successfully cleared!`);

        message.channel.send({embed});
    } else if (param2[1] == "search") {
        if (param2[2] == null) {
            const embed = new Discord.MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setDescription(`Uh oh! Looks like you forgot to give me a last.fm username to look up.\nTry \`!lfm search <username>\``);

            message.channel.send({embed});
        } else {
            fetchFM(message, param2[2]);
        }
    } else if (param2[1] == "set") {
        console.log("Params: " + param2[2]);
        console.log("Tag: " + message.author.tag);
        console.log("ID: " + message.author.id);
        if (param2[2] == null) {
            const embed = new Discord.MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setDescription(`Uh oh! Looks like you forgot to give me a last.fm username to look up.\nTry \`!lfm search <username>\``);

            message.channel.send({embed});
        } else {
            db.query(
                "INSERT INTO lastfm (lastfmUsername, discordTag, discordID) VALUES (?,?,?) " +
                "ON DUPLICATE KEY UPDATE lastfmUsername=?, discordTag=?",
            [param2[2], message.author.tag, message.author.id, param2[2], message.author.tag], function (err, result) {
                if (err) throw err;
                    console.log(result);
            });
            const embed = new Discord.MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setDescription(`Your last.fm username has been set to ${param2[2]}.`);

            message.channel.send({embed});
        }
    } else {
        try {
            let mentionedUser = message.mentions.members.first();

            db.query("SELECT * FROM lastfm WHERE discordID=?", [mentionedUser.user.id], function(err, rows) {
                if (rows[0] == null) {
                    const embed = new Discord.MessageEmbed()
                        .setColor(message.member.displayHexColor)
                        .setDescription(`Uh oh! Looks like ${message.guild.member(mentionedUser).displayName} has not saved their last.fm username.\nThey may set it by typing \`!lfm set <username\`.`);

                    message.channel.send({embed});
                } else {
                    fetchFM(message, rows[0]['lastfmUsername']);
                }
            });
        } catch (err) {
            console.log(`${time()} - ${err}`);
            const embed = new Discord.MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setDescription(`Uh oh! Looks like you forgot to mention the user you want to look up.\nIf you don't want to mention a user, try using \`!lfm search <username>\``);

            message.channel.send({embed});
        }
    }
    
}
//puts puts songs into a queue database
function queueSong(message, cmd, song){
    var voiceServerID = message.guild.id;
    var user = message.author.username;

    console.log(voiceServerID)
    console.log(config.discord.server)
    if (voiceServerID != config.discord.server) { //makes sure message is coming from the bot's voice server, prevents other places the main bot is in from interacting on the music side
        console.log("Not correct voice server");
        return;
    }
    console.log(cmd);
    console.log(cmd[1]);
    if(cmd[1] == null){
        if((cmd[0].toLowerCase() === "!queue") || (cmd[0].toLowerCase() === "!q")){
            printQueue(message);
        }
    }else{
        var title = song;
        if (message.member.voice.channel) { //Checks if the user is in the same voice channel as the bot
            console.log("title: " + title);
            fuzzySearch(title.toLowerCase(), function(result){
                if(result){ //song found in db after fuzzy search
                    console.log(result);
                    console.log("In DB")
                    console.log(result['path']);
                    db.query("SELECT * FROM queue WHERE path LIKE ? ORDER BY path ASC", [result['path']], function(err, rows2){
                        console.log(rows2);
                        if(rows2[0] != null)
                            message.reply(result['name'] + " is already in the queue and was not added");
                        else {
                            db.query("INSERT INTO queue (name, path, queuedby) VALUES (?,?,?)", [result['name'], result['path'], user]);
                            message.reply(result['name'] + " has been added to the queue.")
                            console.log(result['name'] + " " + result['path'] + " " + user);
                        }
                    })
                }else{
                    message.reply("That song could not be found. Please search the track listings - !tracks or ask iandrewc to add the song.");
                }
            });
        } else {
                message.reply("You must be in the Red voice channel to queue music.");
                console.log("User not in Voice Channel");
        }
    }
}

function printQueue(message){
    db.query("SELECT id, name FROM recent WHERE 1 ORDER BY id DESC", function(err, rows) {
        var playingSong = rows[0]['name'];
        db.query("SELECT id, name FROM queue WHERE 1 ORDER BY id ASC", function(err, rows2) {
            if(rows2.length > 0){
                var num;
                var count = 1;
                var songQueue = "";
                
                console.log(rows2);
                console.log(rows2[0]['name']);
                for(num = 0; num < rows2.length; num++){ 
                    songQueue = songQueue + count + ". " + rows2[num]['name'] + "\n";
                    count++;
                }
                message.channel.send({embed: {
                    color: 0x1c2e6e,
                    title: "Currently playing: " + playingSong,
                    description: "Queued for play:\n" + songQueue,
                    url: "https://lhwb.tay.rocks/queue.php",
                }});
            } else {
                message.reply("There are currently no songs in the queue.");
            }
        });
    });
}

function removeQueue(message, song){
    if (message.guild.id != config.discord.server) { //makes sure message is coming from the bot's voice server, prevents other places the main bot is in from interacting on the music side
        console.log("Not correct voice server");
        return;
    }
    db.query("SELECT COUNT(*) AS queueCount FROM queue WHERE name = ?", [song], function(err, result){
        if (err) throw err;
            //console.log(err + "\n" + result);
        if(result[0].queueCount > 0) {
            db.query("DELETE FROM queue WHERE name = ?", [song]); //deletes the song from the queue.
            message.reply(song + " has been removed from the queue.");
            console.log(song + " removed from queue.");
        } else {
            message.reply(song + " was not in the queue.");
            console.log(song + " not in queue.");
        }
    });
}

//Pulls most recently played song from the recently played database
function currentCommand(message) {
    db.query("SELECT id, name, album, queuedby FROM recent WHERE 1 ORDER BY id DESC LIMIT 1", function(err, rows) {
        var currentAlbum = rows[0]['album'];
        var currentSong = rows[0]['name'];
        var queuedBy = rows[0]['queuedby'];
        
        db.query("SELECT name, albumart FROM music where name = ?",[currentSong], function(err, rows2) {
            var albumArt = rows2[0]['albumart'];
            if(queuedBy != null) {
                message.channel.send({embed: {
                    color: 0x442691,
                    title: currentSong,
                    description: currentAlbum,
                    thumbnail: {
                        url: albumArt,
                    },
                    footer: {
                        text: "Queued by: " + queuedBy,
                    }
                }});
            } else {
                message.channel.send({embed: {
                    color: 0x442691,
                    title: currentSong,
                    description: currentAlbum,
                    thumbnail: {
                        url: albumArt,
                    }
                }});
            }
        });
    });
}

//displays last 10 songs from recently played database
function recentlyPlayedCommand(message) {
    db.query("SELECT id, name FROM recent WHERE 1 ORDER BY id DESC LIMIT 11", function(err, rows) {
        var num;
        var playingSong = rows[0]['name'];
        var recentSongs = "";
        
        for(num = 1; num < rows.length; num++){ //starts with song 1 which was the most recent played before current
            recentSongs = recentSongs + num + ". " + rows[num]['name'] + "\n"
        }
        message.channel.send({embed: {
            color: 0x1c2e6e,
            title: "Currently playing: " + playingSong,
            description: "Recently Played:\n" + recentSongs,
            url: "https://lhwb.tay.rocks/recent.php",
        }});
    });
}

//displays last 5 ranked songs, user selectable number
function rankPlaysCommand(message, listNum) {
    var listSize = 5; //defaults to 5
    if (listNum > 0)
        listSize = parseInt(listNum); //makes the string an number and then updates to that number
    
    db.query("SELECT ANY_VALUE(name) AS song, path, MAX(playcount) AS plays FROM music WHERE playcount > 0 GROUP BY path ORDER BY plays DESC LIMIT ?", [listSize], function(err, rows) {
        var num;
        var rankedPlays = "";
        var count = 1; //allows numbers to start at 1 for list while db iterates from 0
        
        for(num = 0; num < rows.length; num++){ 
            rankedPlays = rankedPlays + count + ". " + rows[num]['song'] + " - " + rows[num]['plays'] + " plays\n";
            count++;
        }
        message.channel.send({embed: {
            color: 0x1c2e6e,
            title: "Ranked Plays:",
            description: rankedPlays,
            url: "https://lhwb.tay.rocks/recent.php",
        }});
    });
}

function fuzzySearch(title, callback){
	var result;
	var maxEditDist = 5;
	var minEditDist = maxEditDist;
	db.query("SELECT path,name FROM music", function(err, songList) {
		var i;
		for(i = 0; i < songList.length; i++){
			editDistance(title, songList[i]['name'].toLowerCase(), function(tempDist){
				if(tempDist < minEditDist && tempDist <= maxEditDist){
					minEditDist = tempDist;
					result = songList[i]
				}
			});
		}
		callback(result);
	});
}

function editDistance(source, target, callback){
	n = source.length + 1;
	m = target.length + 1;
	var distMatrix = [];
	var min = 0;
	var i,j;
	for(i = 0; i < n; i++){
		distMatrix[i] = [];
	}
	for(i = 0; i < n; i++){
		distMatrix[i][0] = i;
	}
	for(i = 0; i < m; i++){
		distMatrix[0][i] = i;
	}
	for(i = 1; i < n; i++){
		for (j = 1; j < m; j++){
			if(source.charAt(j-1) === target.charAt(i-1)){
				min = distMatrix[i-1][j-1];
			}else{
				min = Math.min(distMatrix[i-1][j-1] + 1, distMatrix[i-1][j] + 1, distMatrix[i][j-1] + 1);

			}
			distMatrix[i][j] = min;
		}
	}
	callback(distMatrix[n-1][m-1]);
}

function restartCommand(message) {
    message.channel.send(`LHWB non-music restarting!`).then(() => process.exit(-1));
}

function time() {
    var date = new Date();
    var time = date.toLocaleString();
    return time;
}

bot.login(config.bot.token);
