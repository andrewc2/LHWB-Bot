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


let qDisable = false;

process.on('unhandledRejection', error => {
  throw error;
}); 

bot.on("ready", async () => {
	console.log(`${time()} - LHWB non-music is ready!`);
});

/* bot.on("debug", async (err) => {
	console.log(err)
}) */

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
            if(isOwner(message))
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
            
        case "!gif":
            gifCommand(message);
            break;
        
        case "!wtny":
            wtnyCommand(message);
            break;

        case "!danc":
            dancCommand(message);
            break;

        case "!redguests":
            redTourGuestsCommand(message);
            break;

        case "!redsetlist":
            redSetlistCommand(message);
            break;
                
        case "!1989ss":
            WT1989SecretSongCommand(message);
            break;

        case "!1989setlist":
            WT1989SetlistCommand(message);
            break;
            
        case "!1989guests":
            WT1989GuestsCommand(message);
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
        case "!rep":
            albumReputationCommand(message);
            break;
                  
        case "!lover":
            albumLoverCommand(message);
            break;
                  
        case "!folklore":
            albumFolkloreCommand(message);
            break;
                  
        case "!evermore":
            albumEvermoreCommand(message);
            break;
        
        case "!queue":
        case "!q":
            if(message.channel.id == config.discord.botsChannel || (message.member.roles.cache.has(config.discord.repRole) && message.channel.id == config.discord.vcChannel) || isMod(message)) { //check if user is in bots or mod
                queueSong(message, command, params);
            }
            break;

        case "!queuealbum":
        case "!qalbum":
            //if((message.member.roles.cache.has(config.discord.repRole) && message.channel.id == config.discord.botsChannel) || isMod(message)) { //check if user is in bots or mod
            if(isMod(message)) { //check if user is in bots or mod
                queueAlbum(message, command, params);
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
            if(cmdRestrictions(message)){
                removeQueue(message, params);
            }
            break;
            
        case "!cq":
        case "!clearqueue":
            if(cmdRestrictions(message)){
                clearQueue(message, params);
            }
            break;
        
        case "!rankplays":
            rankPlaysCommand(message, params);
            break;

        case "!togglequeue":
            if(isOwner(message)) toggleQ(message);
            break;
                
    }
});

function isMod(message) {
    if (message.guild != null)
        return (message.member.roles.cache.has(config.discord.rTSSubMod) || message.member.roles.cache.has(config.discord.rTSMod) || message.author.id == config.discord.fs || message.author.id == config.discord.iandrewc);
    else
        return (message.author.id == config.discord.fs || message.author.id == config.discord.iandrewc);
}

function isOwner(message) {
    return (message.author.id == config.discord.iandrewc);
}

function cmdRestrictions(message) {
    if (message.guild != null) //bots, reprole, submod, mod, or FS/iAndrewC
        return ((message.member.roles.cache.has(config.discord.repRole) && message.channel.id == config.discord.botsChannel) || message.member.roles.cache.has(config.discord.rTSSubMod) || message.member.roles.cache.has(config.discord.rTSMod) || message.author.id == config.discord.fs || message.author.id == config.discord.iandrewc);
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
            const embed = new Discord.MessageEmbed()
                .setColor("#eb4034")
                .setAuthor(`${rows[0]['user']}'s oof counter`, 'https://red.ghst.in/ts.png', 'https://turtlebyte.github.io/oofdebt/')
                .setDescription(`Total: ${rows[0]['counter']}`)
                .setFooter(`As of ${rows[0]['lastUsed']}`);

            message.channel.send({embed});
            //message.reply(`${rows[0]['user']}'s \`oof\` counter is at \`${rows[0]['counter']}\` as of \`${rows[0]['lastUsed']}\`.`);
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
        .setDescription("The full requestable track list is here: https://lhwb.dev/lhwb.php");

    message.channel.send({embed});
}

function helpCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor("LosingHimWasBlue Commands", bot.user.avatarURL)
        .setDescription("The full command list is available here: https://lhwb.dev/");

    message.channel.send({embed});
}

function dancCommand(message) {
	message.reply(`:thinking:`);
}

function wtnyCommand(message) {
	message.channel.send({files: ["https://i.imgur.com/02RxUF4.gif"]});
}

function eyerollCommand(message) {
	message.channel.send(`:rolling_eyes:`);
}

function liveStreamCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(5218488)
        .setAuthor('Live Stream', 'https://red.ghst.in/ts.png', 'https://speaknow.rocks:1989/player/')
        .setURL(`https://speaknow.rocks:1989/player/`)
        .setDescription("[HLS Stream Player](https://speaknow.rocks:1989/)\n\nStream will be minimum 30sec behind from live\nIf you have issues please refresh your browser first.")
        .setFooter("Please do not share this stream outside of this discord server.");
        message.channel.send({embed});
}

function redTourGuestsCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(11476553)
        .setAuthor("The Red Tour - Special Guests", "https://red.ghst.in/ts.png", "https://en.wikipedia.org/wiki/The_Red_Tour#Tour_dates")
        .setThumbnail("https://upload.wikimedia.org/wikipedia/en/9/99/The_Red_Tour.png")
        .setDescription("3-19-13 (St. Louis N2) Hey Porsche - Nelly\n3-28-13 (Newark N2) Everybody Talks - Neon Trees (Tyler Glenn)\n3-29-13 (Newark N3) Drive By - Train (Pat Monahan)\n4-19-13 (Atlanta N2) Both of Us - B.o.B\n7-13-13 (East Rutherford) My Songs Know What You Did in the Dark (Light Em Up) - Fall Out Boy (Patrick Stump) \n7-27-13 (Foxborough N2) You're So Vain - Carly Simon\n8-19-13 (Los Angeles N1) Want U Back - Cher Lloyd; Brave - Sara Bareilles\n8-20-13 (Los Angeles N2) Closer - Tegan and Sara\n8-23-13 (Los Angeles N3) Anything Could Happen - Ellie Goulding\n8-24-13 (Los Angeles N4) Jenny From the Block - Jennifer Lopez\n8-27-13 (Sacramento) The Last Time - Gary Lightbody\n9-19-13 (Nashville N1) I Don't Want This Night to End - Luke Bryan\n9-20-13 (Nashville N2) What Hurts the Most - Jeffrey Steele (Rascal Flatts)\n9-21-13 (Nashville N3) I Want Crazy - Hunter Hayes\n2-1-14 (London N1) Lego House - Ed Sheeran (Normally Ed performs Everything Has Changed with Taylor)\n2-2-14 (London N2) Money on My Mind - Sam Smith\n2-4-14 (London N3) Breakeven - The Script (Danny O'Donoghue)\n2-7-14 (Berlin) I See Fire - Ed Sheeran (Normally Ed performs Everything Has Changed with Taylor)\n2-10-14 (London N4) Next to Me - Emeli Sandé\n2-11-14 (London N5) Burn - Ellie Goulding");
    message.channel.send({embed});
}

function redSetlistCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(11476553)
        .setAuthor("The Red Tour - Typical Setlist", "https://red.ghst.in/ts.png", "https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=bd6adba")
        .setThumbnail("https://upload.wikimedia.org/wikipedia/en/9/99/The_Red_Tour.png")
        .setDescription("1. State of Grace\n2. Holy Ground\n3. Red\n4. You Belong with Me\n5. The Lucky One\n6. Mean\n7. Stay Stay Stay (contains elements of 'Ho Hey')\n8. 22\n9. I Almost Do\n10. Everything Has Changed (with Ed Sheeran)\n11. Begin Again\n12. Sparks Fly\n13. I Knew You Were Trouble\n14. All Too Well\n15. Love Story\n16. Treacherous\n\nEncore\n17. We Are Never Ever Getting Back Together\n\nStarting on May 30, 2014 (Asia Leg), 'You Belong With Me' replaced 'Begin Again'. Additionally, 'Everything Has Changed' and 'Treacherous' were removed from the set list.");
    message.channel.send({embed});
}

function WT1989SecretSongCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(568027)
        .setAuthor("1989 World Tour Secret Songs", "https://red.ghst.in/ts.png", "https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=3d0a56f")
        .setThumbnail("https://i.imgur.com/tIO68fu.jpg")
        .setDescription("6-30-15 Holy Ground (Dublin N2)\n7-19-15 Mean (Chicago N2)\n8-1-15 Sparks Fly (Vancouver)\n8-8-15 Mean (Seattle)\n8-14-15 Should've Said No (Santa Clara N1)\n8-15-15 Never Grow Up (Santa Clara N2)\n8-17-15 Ronan (Glendale N1)\n8-22-15 All Too Well (LA N1)\n8-23-15 White Horse (Duet with Uzo Aduba) (LA N2)\n8-26-15 Mean (LA N5)\n9-9-15 Mean (Houston)\n9-12-15 Mean (St. Paul)\n9-17-15 Red (Columbus N1)\n12-5-15 Mine (Brisbane)\n\nMost other shows alternated between 1 or 2 of these three songs: (All You Had to Do Was Stay / Fifteen / You Belong With Me) ");
    message.channel.send({embed});
}

function WT1989SetlistCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(568027)
        .setAuthor("Typical 1989 World Tour Setlist", "https://red.ghst.in/ts.png", "https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=3d0a56f")
        .setThumbnail("https://i.imgur.com/tIO68fu.jpg")
        .setDescription("1. Welcome to New York\n2. New Romantics\n3. Blank Space\n4. I Knew You Were Trouble (Rock Version)\n5. I Wish You Would\n6. How You Get the Girl\n7. I Know Places\n8. All You Had to Do Was Stay or Fifteen or You Belong With Me (some cities got two of these)\n9. Special Guest (!1989guests) / Some cities got Wonderland\n10. You Are In Love (Acoustic - some early cities)\n11. Clean\n12. Love Story (Synth Version)\n13. Style\n14. This Love\n15. Bad Blood\n16. We Are Never Ever Getting Back Together (Rock Version)\n17. Enchanted / Wildest Dreams\n18. Out of the Woods\n19. Shake It Off");
    message.channel.send({embed});
}

function WT1989GuestsCommand(message) {
    if (message.guild != null){
        const embed = new Discord.MessageEmbed()
            .setColor(568027)
            .setAuthor("1989 World Tour Special Guests", "https://red.ghst.in/ts.png", "https://en.wikipedia.org/wiki/The_1989_World_Tour#Shows")
            .setThumbnail("https://i.imgur.com/tIO68fu.jpg")
            .setDescription("Due to the number of guests I've DM'd you the full list!");
        message.channel.send({embed});
    }

    const embed2 = new Discord.MessageEmbed()
        .setColor(568027)
        .setAuthor("1989 World Tour Special Guests", "https://red.ghst.in/ts.png", "https://en.wikipedia.org/wiki/The_1989_World_Tour#Shows")
        .setThumbnail("https://i.imgur.com/tIO68fu.jpg")
        .addFields(
            { name: 'Leg 2 - North America', value: '5-15-15 (Las Vegas) Ed Sheeran - Tenerife Sea\n5-30-15 (Detroit) Dan Reynolds (Imagine Dragons) - Radioactive\n6-6-15 (Pittsburgh) Little Big Town - Pontoon\n6-12-15 (Philadelphia N1) Echosmith - Cool Kids\n6-13-15 (Philadelphia N2) Rachel Platten - Fight Song' },
            { name: 'Leg 4a - North America', value: '7-10-15 (East Rutherford N1) The Weeknd - Can\'t Feel My Face\n7-11-15 (East Rutherford N2) Nick Jonas - Jealous\n7-13-15 (DC N1) Lorde - Royals\n7-14-15 (DC N2) Jason Derulo - Want to Want Me\n7-18-15 (Chicago N1) Andy Grammer - Honey, I\'m Good\n7-19-15 (Chicago N2) Sam Hunt - Steal My Show\n7-24-15 (Foxborough N1) Walk The Moon - Shut Up and Dance\n7-25-15 (Foxborough N2) MKTO - Classic\n8-1-15 (Vancouver) Nico & Vinz - Am I Wrong\n8-8-15 (Seattle) Shawn Mendes - Happy Birthday; Fetty Wap - Trap Queen\n8-14-15 (Santa Clara N1) Fifth Harmony - Worth It\n8-15-15 (Santa Clara N2) Little Mix (Black Magic\n8-22-15 (LA N1) Ryan Tedder - Counting Stars; Kobe Bryant - Most Sold Out Shows Banner\n8-23-15 (LA N2) Mary J Blige - Doubt / Family Affair\n8-24-15 (LA N3) Natalie Maines (Dixie Chicks) - Goodbye Earl; Alanis Morissette - You Oughta Know\n8-25-15 (LA N4) Beck w/ St. Vincent - Dreams; John Legend - All Of Me\n8-26-15 (LA N5) Selena Gomez - Good For You; Lisa Kudrow - Smelly Cat; Justin Timberlake - Mirrors' },
            { name: 'Leg 4b - North America', value: '8-29-15 (San Diego) OMI - Cheerleader; Avril Lavigne - Complicated\n9-9-15 (Houston) Wiz Khalifa - See You Again\n9-16-15 (Indianapolis) The Band Perry - If I Die Young\n9-18-15 (Columbus N2) Echosmith - Cool Kids\n9-21-15 (Kansas City) Dierks Bentley - Every Mile a Memory\n9-25-15 (Nashville N1) Kelsea Ballerini - Love Me Like You Mean It; Steven Tyler - I Don\'t Want to Miss a Thing; Alison Krause - When You Say Nothing at All\n9-26-15 (Nashville N2) Leona Lewis - Bleeding Love; Mick Jagger - Satisfaction\n9-29-15 (St. Louis) Nelly - The Fix / Hot in Herre w/ HAIM\n10-2-15 (Toronto N1) Keith Urban - John Cougar, John Deere, John 3:16 / Somebody Like You\n10-3-15 (Toronto N2) Charli XCX - Boom Clap' },
        )
        .setFooter('Only North America had special guests')
    message.author.send({ embed: embed2 });
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
        description: "Please use !repSS to get a PM of the full list.",
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
    const embed = new Discord.MessageEmbed()
        .setColor(568027)
        .setAuthor("Typical reputation Stadium Tour Setlist", "https://red.ghst.in/ts.png", "https://www.setlist.fm/stats/average-setlist/taylor-swift-3bd6bc5c.html?tour=3d0a56f")
        .setThumbnail("https://i.imgur.com/Zhg0oXF.jpg")
        .setDescription("Before Taylor: Bad Reputation\n\nreputation Video\n\n1. ...Ready for It?\n2. I Did Something Bad\n3. Gorgeous\n4. Style / Love Story / You Belong With Me\n\nLook What You Made Me Do Video\n\n5. Look What You Made Me Do\n6. End Game (no verses)\n7. King of My Heart\n8. Delicate (flying to bstage)\n9. Shake It Off (left bstage)\n10. Dancing With Our Hands Tied [Exchanges with So It Goes...] (left bstage)\n11. !secretsong (left bstage)\n12. Blank Space (right bstage)\n13. Dress (right bstage)\n14. Bad Blood / Should've Said No\n15. Don't Blame Me\n16. Long Live / New Year's Day\n\nWhy She Disappeared video\n\n17. Getaway Car\n18. Call It What You Want\n19. We Are Never Ever Getting Back Together / This Is Why We Can't Have Nice Things");
    message.channel.send({embed});
}

function repGuestsCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(568027)
        .setAuthor("Special Guests", "https://red.ghst.in/ts.png", "https://en.wikipedia.org/wiki/Taylor_Swift%27s_Reputation_Stadium_Tour#Shows")
        .setThumbnail("https://i.imgur.com/Zhg0oXF.jpg")
        .setDescription("5-18-18 (Pasadena) There's Nothing Holdin' Me Back - Shawn Mendes\n5-19-18 (Pasadena) My My My! - Troye Sivan; Hands to Myself - Selena Gomez\n6-22-18 (London) Slow Hands - Niall Horan\n6-23-18 (London) Angels - Robbie Williams\n7-27-18 (Foxborough) Curious - Hayley Kiyoko\n8-04-18 (Toronto) Summer of 69 - Bryan Adams\n8-25-18 (Nashville) Tim McGraw - Faith Hill / Tim McGraw\n10-5-18 (Dallas) The Middle - Maren Morris\n10-6-18 (Dallas) Sugarland - Babe [full production]");
    message.channel.send({embed});
}

function albumDebutCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(568027)
        .setAuthor("Taylor Swift", "https://red.ghst.in/ts.png", "https://en.wikipedia.org/wiki/Taylor_Swift_(album)")
        .setThumbnail("https://i.imgur.com/w0bksSN.jpg")
        .setDescription("**Taylor Swift** was released on __October 24, 2006__ \n\n1. Tim McGraw\n2. Picture to Burn\n3. Teardrops on My Guitar\n4. A Place in This World\n5. Cold as You\n6. The Outside\n7. Tied Together with a Smile\n8. Stay Beautiful\n9. Should've Said No\n10. Mary's Song (Oh My My My)\n11. Our Song\n\n__Deluxe Version__\n12. I'm Only Me When I'm with You\n13. Invisible\n14. A Perfectly Good Heart");
    message.channel.send({embed});
}

function albumBeautifulEyesCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(0xe78234)
        .setAuthor("Taylor Swift", "https://red.ghst.in/ts.png", "https://en.wikipedia.org/wiki/Beautiful_Eyes")
        .setThumbnail("https://i.imgur.com/sN5DToG.jpg")
        .setDescription("**Beautiful Eyes** was released on __July 15, 2008__ \n\n1. Beautiful Eyes\n2. Should've Said No (Alternate version)\n3. Teardrops on My Guitar (Acoustic version)\n4. Picture to Burn (Radio edit)\n5. I'm Only Me When I'm with You\n6. I Heart ?\n\n__Disk Two (DVD)__\n1. Beautiful Eyes (music video)\n2. Picture to Burn (music video)\n3. I'm Only Me When I'm with You (music video)\n4. Tim McGraw (music video)\n5. Teardrops on My Guitar (Pop version music video)\n6. Our Song (music video)\n7. Making of 'Picture to Burn' Video\n8. GAC New Artist Interview\n9. 2008 ACM Awards Performance of 'Should've Said No");
    message.channel.send({embed});
}

function albumFearlessCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(14929032)
        .setAuthor("Taylor Swift", "https://red.ghst.in/ts.png", "https://en.wikipedia.org/wiki/Fearless_(Taylor_Swift_album)")
        .setThumbnail("https://i.imgur.com/TPL7mge.jpg")
        .setDescription("**Fearless** was released on __November 11, 2008__ \n\n1. Fearless\n2. Fifteen\n3. Love Story\n4. Hey Stephen\n5. White Horse\n6. You Belong with Me\n7. Breathe (featuring Colbie Caillat)\n8. Tell Me Why\n9. You're Not Sorry\n10. The Way I Loved You\n11. Forever and Always\n12. The Best Day\n13. Change\n\n__Platinum Edition Tracks:__\nJump Then Fall\nUntouchable\nCome in with the Rain\nSuperstar\nThe Other Side of the Door\nForever And Always (Piano Version)");
    message.channel.send({embed});
}

function albumSpeakNowCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(6892915)
        .setAuthor("Taylor Swift", "https://red.ghst.in/ts.png", "https://en.wikipedia.org/wiki/Speak_Now")
        .setThumbnail("https://i.imgur.com/TNKbt8Y.jpg")
        .setDescription("**Speak Now** was released on __October 25, 2010__ \n\n1. Mine\n2. Sparks Fly\n3. Back to December\n4. Speak Now\n5. Dear John\n6. Mean\n7. The Story of Us\n8. Never Grow Up\n9. Enchanted\n10. Better Than Revenge\n11. Innocent\n12. Haunted\n13. Last Kiss\n14. Long Live\n\n__Deluxe Version__\n15. Ours\n16. If This Was A Movie\n17. Superman");
    message.channel.send({embed});
}

function albumRedCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(11476553)
        .setAuthor("Taylor Swift", "https://red.ghst.in/ts.png", "https://en.wikipedia.org/wiki/Red_(Taylor_Swift_album)")
        .setThumbnail("http://i.imgur.com/as6dlgi.jpg")
        .setDescription("**Red** was released on __October 22, 2012__ \n\n1. State of Grace\n2. Red\n3. Treacherous\n4. I Knew You Were Trouble.\n5. All Too Well\n6. 22\n7. I Almost Do\n8. We Are Never Ever Getting Back Together\n9. Stay Stay Stay\n10. The Last Time (featuring Gary Lightbody)\n11. Holy Ground\n12. Sad Beautiful Tragic\n13. The Lucky One\n14 Everything Has Changed (featuring Ed Sheeran)\n15. Starlight\n16. Begin Again\n\n__Deluxe Version__\n17. The Moment I Knew\n18. Come Back... Be Here\n19. Girl At Home");
    message.channel.send({embed});
}

function album1989Command(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(13484710)
        .setAuthor("Taylor Swift", "https://red.ghst.in/ts.png", "https://en.wikipedia.org/wiki/1989_(Taylor_Swift_album)")
        .setThumbnail("https://i.imgur.com/i1QDoZR.jpg")
        .setDescription("**1989** was released on __October 27, 2014__ \n\n1. Welcome to New York\n2. Blank Space\n3. Style\n4. Out of the Woods\n5. All You Had to Do Was Stay\n6. Shake It Off\n7. I Wish You Would\n8. Bad Blood\n9. Wildest Dreams\n10. How You Get the Girl\n11. This Love\n12. I Know Places\n13. Clean\n\n__Deluxe Version__\n14. Wonderland\n15. You Are In Love\n16. New Romantics");
    message.channel.send({embed});
}

function albumReputationCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(12040119)
        .setAuthor("Taylor Swift", "https://red.ghst.in/ts.png", "https://en.wikipedia.org/wiki/Reputation_(Taylor_Swift_album)")
        .setThumbnail("https://i.imgur.com/o2v3b7E.jpg")
        .setDescription("**reputation** was released on __November 10, 2017__ \n\n1. ...Ready For It?\n2. End Game (ft. Ed Sheeran and Future)\n3. I Did Something Bad\n4. Don't Blame Me\n5. Delicate\n6. Look What You Made Me Do\n7. So It Goes...\n8. Gorgeous\n9. Getaway Car\n10. King Of My Heart\n11. Dancing With Our Hands Tied\n12. Dress\n13. This Is Why We Can't Have Nice Things\n14. Call It What You Want\n15. New Year's Day");
    message.channel.send({embed});
}

function albumLoverCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(15651566)
        .setAuthor("Taylor Swift", "https://red.ghst.in/ts.png", "https://en.wikipedia.org/wiki/Lover_(album)")
        .setThumbnail("https://i.imgur.com/cNnUR0M.jpg")
        .setDescription("**Lover** was released on __August 23, 2019__ \n\n1. I Forgot That You Existed\n2. Cruel Summer\n3. Lover\n4. The Man\n5. The Archer\n6. I Think He Knows\n7. Miss Americana & The Heartbreak Prince\n8. Paper Rings\n9. Cornelia Street\n10. Death By A Thousand Cuts\n11. London Boy\n12. Soon You'll Get Better (ft. The Chicks)\n13. False God\n14. You Need To Calm Down\n15. Afterglow\n16. ME! (ft. Brendon Urie)\n17. It's Nice To Have A Friend\n18. Daylight");
    message.channel.send({embed});
}

function albumFolkloreCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(12040119)
        .setAuthor("Taylor Swift", "https://red.ghst.in/ts.png", "https://en.wikipedia.org/wiki/Folklore_(Taylor_Swift_album)")
        .setThumbnail("https://i.imgur.com/oZvDEky.jpg")
        .setDescription("**folklore** was released on __July 24, 2020__ \n\n1. the 1\n2. cardigan\n3. the last great american dynasty\n4. exile (featuring Bon Iver)\n5. my tears ricochet\n6. mirrorball\n7. seven\n8. august\n9. this is me trying\n10. illicit affairs\n11. invisible string\n12. mad woman\n13. epiphany\n14. betty\n15. peace\n16. hoax\nDeluxe 17. the lakes");
    message.channel.send({embed});
}

function albumEvermoreCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(12040119)
        .setAuthor("Taylor Swift", "https://red.ghst.in/ts.png", "https://en.wikipedia.org/wiki/Evermore_(Taylor_Swift_album)")
        .setThumbnail("https://i.imgur.com/YcHPqib.jpg")
        .setDescription("**evermore** was released on __December 11, 2020__ \n\n1. willow\n2. champagne problems\n3. gold rush\n4. 'tis the damn season\n5. tolerate it\n6. no body, no crime (featuring Haim)\n7. happiness\n8. dorothea\n9. coney island (featuring The National)\n10. ivy\n11. cowboy like me\n12. long story short\n13. marjorie\n14. closure\n15. evermore (featuring Bon Iver)\nDeluxe\n16. right where you left me\n17. it's time to go");
    message.channel.send({embed});
}

function versionCommand(message) {
    const embed = new Discord.MessageEmbed()
        .setColor(5218488)
        .setTitle("Patch Notes:")
        .setAuthor(`Version: ${config.bot.version}`, 'https://red.ghst.in/ts.png', 'https://lhwb.dev/')
        .setDescription(`${config.bot.patchnotes}`);
    message.channel.send({embed});
}

function lsayCommand(message, command)
{
    try {
        let params = command.slice(2, command.length).join(" ");
        //console.log("2nd Params: " + params);
        bot.channels.cache.get(command[1]).send(params);
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

    let end2 = new Date('12/14/2020 11:35 PM');
    let event2 = "Taylor on Kimmel ABC 12/14 - 11:35PM EST\n";
    let end1 = new Date('03/14/2021 8:00 PM');
    let event1 = "2020 Grammy Awards Ceremony Sun 3/14 - 8PM-11PM EST (Postponed)\n";
    let end3 = new Date('06/01/2021 7:00 PM');
    let event3 = "LoverFest? LoverFolkFest? FolkerFest? 2021 - June 2021\n";
    //let end3 = new Date('06/01/2021 7:00 PM');
    //let event3 = "LoverFest 2021 - June 2021\n";
//grammys 1/31 8pm et

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
    let distance = end1 - now;
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
        .setTitle(`Countdowns`)
        .setURL(`https://taylorswift.com`)     
        //.setDescription(event1 + days + " Days " + hours + " Hours " + minutes + " Minutes " + seconds + " Seconds \n\n" + event2 + days2 + " Days " + hours2 + " Hours " + minutes2 + " Minutes " + seconds2 + " Seconds\n\n"/*  + event3 + days3 + " Days " + hours3 + " Hours " + minutes3 + " Minutes " + seconds3 + " Seconds" */);
        .setDescription(event1 + days + " Days " + hours + " Hours " + minutes + " Minutes " + seconds + " Seconds \n\n");
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
                    .addField(`${status} Artist`, `${recentTracks.track[0].artist["#text"]}`, true)
                    .addField('\u200b', '\u200b', true)
                    .addField("Previous Song", `${recentTracks.track[1].name}`, true)
                    .addField("Previous Artist", `${recentTracks.track[1].artist["#text"]}`, true)
                    .addField('\u200b', '\u200b', true)
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
                        .setDescription(`Uh oh! Looks like ${message.guild.cache.member(mentionedUser).displayName} has not saved their last.fm username.\nThey may set it by typing \`!lfm set <username\`.`);

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

function toggleQ(message) {
    qDisable = !qDisable;
    if(qDisable){
        log("disabled queue " + qDisable);
        const embed = new Discord.MessageEmbed()
            .setColor(0xFF0000)
            .setDescription(`Viewing the queue has been disabled.`);
        message.channel.send({embed});
    } else {
        log("skip enabled " + qDisable);
        const embed = new Discord.MessageEmbed()
            .setColor(0x00FF5A)
            .setDescription(`Viewing the queue has been enabled.`);
        message.channel.send({embed});
    }
}

function queueAlbum(message, cmd, album){
    var voiceServerID = message.guild.id;
    var user = message.author.username;

    if (voiceServerID != config.discord.server) { //makes sure message is coming from the bot's voice server, prevents other places the main bot is in from interacting on the music side
        log("Not correct voice server");
        return;
    }

    if(cmd[1] == null){
        if((cmd[0].toLowerCase() === "!qalbum") || (cmd[0].toLowerCase() === "!queuealbum")){
            const embed = new Discord.MessageEmbed()
                .setColor(16711680) //red
                .setDescription(`You need to provide the album you wish to queue`)
            message.channel.send({embed});
        }
    }else{
        var title = album;
        if (message.member.voice.channel) { //Checks if the user is in the same voice channel as the bot
            if(title == "folklore"){
                var sql = "INSERT INTO queue (name, path, queuedby) VALUES ?";
                var values = [
                    ['the 1', 'folklore/the 1.mp3', user],
                    ['cardigan', 'folklore/cardigan.mp3', user],
                    ['the last great american dynasty', 'folklore/the last great american dynasty.mp3', user],
                    ['exile', 'folklore/exile.mp3', user],
                    ['my tears ricochet', 'folklore/my tears ricochet.mp3', user],
                    ['mirrorball', 'folklore/mirrorball.mp3', user],
                    ['seven', 'folklore/seven.mp3', user],
                    ['august', 'folklore/august.mp3', user],
                    ['this is me trying', 'folklore/this is me trying.mp3', user],
                    ['illicit affairs', 'folklore/illicit affairs.mp3', user],
                    ['invisible string', 'folklore/invisible string.mp3', user],
                    ['mad woman', 'folklore/mad woman.mp3', user],
                    ['epiphany', 'folklore/epiphany.mp3', user],
                    ['betty', 'folklore/betty.mp3', user],
                    ['peace', 'folklore/peace.mp3', user],
                    ['hoax', 'folklore/hoax.mp3', user],
                    ['the lakes', 'folklore/the lakes.mp3', user],
                ];

                db.query(sql, [values], function(err) {
                    if (err) throw err;
                });

                const embed = new Discord.MessageEmbed()
                    .setColor('#FF69B4') //pink
                    .setDescription(`The album: ${title}, has been added to the queue, note that if any songs from this album were already queued when they play the first time they will be removed from later in the queue as well (I'm not sure how to fix this yet).`)
                message.channel.send({embed});
                log(`folklore album Queued By: ${user}`);
             
            }else{
                const embed = new Discord.MessageEmbed()
                    .setColor(16711680) //red
                    .setDescription(`That album is not available to bulk queue yet.`);
                message.channel.send({embed});
            }
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(16711680) //red
                .setDescription(`You must be in the Red voice channel to queue music.`);
            message.channel.send({embed});
            log("Attempting to queue while not in the Voice Channel.");
        }
    }
}



//puts puts songs into a queue database
function queueSong(message, cmd, song){
    var voiceServerID = message.guild.id;
    var user = message.author.username;

    //console.log(voiceServerID)
    //console.log(config.discord.server)
    if (voiceServerID != config.discord.server) { //makes sure message is coming from the bot's voice server, prevents other places the main bot is in from interacting on the music side
        log("Not correct voice server");
        return;
    }
    //console.log(cmd);
    //console.log(cmd[1]);
    if(cmd[1] == null){
        if((cmd[0].toLowerCase() === "!queue") || (cmd[0].toLowerCase() === "!q")){
            printQueue(message);
        }
    }else{
        var title = song;
        if (message.member.voice.channel) { //Checks if the user is in the same voice channel as the bot
            fuzzySearch(title.toLowerCase(), function(result){
                if(result){ //song found in db after fuzzy search
                    db.query("SELECT * FROM queue WHERE path LIKE ? ORDER BY path ASC", [result['path']], function(err, rows2){
                        //console.log(rows2);
                        if(rows2[0] != null){
                            const embed = new Discord.MessageEmbed()
                                .setColor(16711680) //red
                                .setDescription(`${result['name']} is already in the queue and was not added.`)
                            message.channel.send({embed});
                        }
                        else {
                            db.query("INSERT INTO queue (name, path, queuedby) VALUES (?,?,?)", [result['name'], result['path'], user]);
                            const embed = new Discord.MessageEmbed()
                                .setColor('#FF69B4') //pink
                                .setDescription(`${result['name']} has been added to the queue.`)
                            message.channel.send({embed});
                            log(`Song: ${result['name']} Path: ${result['path']} Queued By: ${user}`);
                        }
                    })
                }else{
                    const embed = new Discord.MessageEmbed()
                        .setColor(16711680) //red
                        .setDescription(`That song could not be found.\nPlease check the track listings (!tracks).\nIf it's not there iandrewc to add the song.`);
                    message.channel.send({embed});
                }
            });
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(16711680) //red
                .setDescription(`You must be in the Red voice channel to queue music.`);
            message.channel.send({embed});
            log("Attempting to queue while not in the Voice Channel.");
        }
    }
}

function printQueue(message){
    if (!qDisable) {    
        db.query("SELECT id, name FROM recent WHERE 1 ORDER BY id DESC", function(err, rows) {
            var playingSong = rows[0]['name'];
            db.query("SELECT id, name FROM queue WHERE 1 ORDER BY id ASC", function(err, rows2) {
                if(rows2.length > 0){
                    var num;
                    var count = 1;
                    var songQueue = "";

                    for(num = 0; num < rows2.length; num++){ 
                        songQueue = songQueue + count + ". " + rows2[num]['name'] + "\n";
                        count++;
                    }
                    
                    const embed = new Discord.MessageEmbed()
                        .setColor('#FF69B4') //pink
                        .setTitle(`Currently playing: ${playingSong}`)
                        .setDescription(`Queued for play:\n${songQueue}`)
                        .setURL('https://lhwb.dev/')
                    message.channel.send({embed});
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setColor(16711680) //red
                        .setDescription(`There are currently no songs in the queue.`);
                    message.channel.send({embed});
                }
            });
        });
    } else {
        const embed = new Discord.MessageEmbed()
            .setColor(0xFF0000)
            .setDescription(`Displaying the queue is temporarily disabled, likely due to an event.`);
        message.channel.send({embed});
    }
}

function removeQueue(message, song){
    if (message.guild.id != config.discord.server) { //makes sure message is coming from the bot's voice server, prevents other places the main bot is in from interacting on the music side
        log("Not correct voice server");
        return;
    }
    db.query("SELECT COUNT(*) AS queueCount FROM queue WHERE name = ?", [song], function(err, result){
        if (err) throw err;

        if(result[0].queueCount > 0) {
            db.query("DELETE FROM queue WHERE name = ?", [song]); //deletes the song from the queue.
            const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setDescription(`${song} has been removed from the queue.`);
            message.channel.send({embed});
            log(song + " removed from queue.");
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(16711680) //red
                .setDescription(`${song} was not in the queue.`);
            message.channel.send({embed});
            log(song + " not in queue.");
        }
    });
}

function clearQueue(message){
    if (message.guild.id != config.discord.server) { //makes sure message is coming from the bot's voice server, prevents other places the main bot is in from interacting on the music side
        log("Not correct voice server");
        return;
    }
    db.query("SELECT COUNT(*) AS queueCount FROM queue", function(err, result){
        if (err) throw err;
        if(result[0].queueCount > 0) {
            db.query("DELETE FROM queue"); //deletes entire queue.
            const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setDescription(`The queue has been cleared.`);
            message.channel.send({embed});
            log("Queue Purged at user request.");
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`The queue is already empty.`);
            message.channel.send({embed});
            log("Queue empty, nothing to purge.");
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
                const embed = new Discord.MessageEmbed()
                    .setColor('#FF69B4') //pink
                    .setTitle(currentSong)
                    .setDescription(currentAlbum)
                    .setThumbnail(albumArt)
                    .setFooter(`Queued by: ${queuedBy}`);
                message.channel.send({embed});
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor('#FF69B4') //pink
                    .setTitle(currentSong)
                    .setDescription(currentAlbum)
                    .setThumbnail(albumArt)
                message.channel.send({embed});
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
        const embed = new Discord.MessageEmbed()
            .setColor('#FF69B4') //pink
            .setTitle(`Currently playing: ${playingSong}`)
            .setDescription(`Recently Played:\n${recentSongs}`)
            .setURL('https://lhwb.dev/recent.php')
        message.channel.send({embed});
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
        const embed = new Discord.MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('Ranked Plays:')
            .setDescription(rankedPlays)
            .setURL('https://lhwb.dev/recent.php')
        message.channel.send({embed});
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
    log("LHWB non-music restarting!");
    const embed = new Discord.MessageEmbed()
        .setColor(16711680) //red
        .setDescription(`LHWB non-music restarting!`);
    message.channel.send({embed}).then(() => process.exit(-1));
}

function log(content) {
    console.log(`${time()} - ${content}`);
}

function time() {
    var date = new Date();
    var time = date.toLocaleString();
    return time;
}

bot.login(config.bot.token).then((tok) => {
	log('Bot logged in successfully!')
  }, err => {
	log(`The bot failed to login due to an error! The error follows:\n\n${err}\n\n`)
	bot.destroy()
  })
