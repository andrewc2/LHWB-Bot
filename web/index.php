<?php
require_once "config.php";

$db = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);
$db->set_charset("utf8mb4");
$server = empty($_GET['server']) ? PRIMARY_GUILD : $_GET['server'];
?>
<!DOCTYPE html>
<html>
    <head>
        <!-- Primary Meta Tags -->
        <title>LosingHimWasBlue [Bot]</title>
        <meta name="title" content="LosingHimWasBlue [Bot]">
        <meta name="description" content="Music bot information for r/TaylorSwift discord chat">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://lhwb.dev/lhwb.php">
        <meta property="og:title" content="LosingHimWasBlue [Bot]">
        <meta property="og:description" content="Music bot information for r/TaylorSwift discord chat">
        <meta property="og:image" content="https://i.imgur.com/NxrK0v4.jpeg">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="https://lhwb.dev/lhwb.php">
        <meta property="twitter:title" content="LosingHimWasBlue [Bot]">
        <meta property="twitter:description" content="Music bot information for r/TaylorSwift discord chat">
        <meta property="twitter:image" content="https://i.imgur.com/NxrK0v4.jpeg">

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EJ2HKNBZ1B"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-EJ2HKNBZ1B');
        </script>
        
        <style type="text/css">
            @font-face {
              font-family: tswift;
              src: url(TaylorSwiftHandwriting.ttf);
            }
            body {
                font-size: 13px;
                color: #ffffff;
                background-color: #323232;
                font-family: arial;
                text-align: center;
                margin-bottom: 20px;
            }
            h1 {
                font-size:52px;
                color: #ffffff;
                font-family: tswift, arial, sans-serif;
                margin: 30px 0 10px 0;
            }
            .nowplaying {
                color:#ffffff;
                font-size: 22px;
                font-family: tswift, arial, sans-serif;
                display: inline;
            }
            p {
                width: 500px;
                text-align: left;
                margin-left: auto;
                margin-right: auto;
            }
            #commands {
                width: 500px;
                text-align: center;
                margin-left: auto;
                margin-right: auto;
                padding-top; 10px;
            }
            
            #dataStore {
                margin-bottom: 10px; float: none; margin: 0 auto; text-align: center;
            }
            
            header {
                font-family: tswift, arial, sans-serif;
                overflow: hidden;
                margin-bottom: 30px;
            }

            header a {
                color: #f2f2f2;
                text-align: center;
                padding: 14px 16px;
                text-decoration: none;
                font-size: 22px;
            }

            header a:hover {
                background-color: #989898;
                color: #000000;
            }
        </style><!-- links 34536A, h1 555555 else 777777 -->
        <link rel="stylesheet" href="sortable-theme-bootstrap.css" />
        <script src="sortable.min.js"></script>
    </head>
    <body>
        <h1>LosingHimWasBlue [Bot]</h1>
        <header>
            <a href="#">Home</a>
            <a href="/lhwb.php">Song List</a>
            <a href="/recent.php">Recently Played</a>
            <a href="https://github.com/andrewc2/Red-Bot">Github</a>
            <a href="/calendar.php">Event Calendar</a>
        </header>

        <div id="dataStore">
            
            <?php
            $stmt = $db->prepare("SELECT id FROM recent_new WHERE 1 ORDER BY id DESC LIMIT 1");
            $stmt->execute();
            $stmt->bind_result($id);
            while ($stmt->fetch())
            {
                echo "<div class='nowplaying'>Total number of songs played: &nbsp;".htmlspecialchars($id + 510246)."</div>";
            }
            ?>
        </div>

        <div id="commands">
            <h4>Music Commands</h4>
            <p>
                !q/!queue: Displays the current song queue (only available in #bots)<br />
                !q/!queue [song]: Adds a song to the current queue (only available in #bots)<br />
                !dq/!dequeue [song]: Removes a song from the queue<br />
                !cq/!clearqueue: Removes all songs from the current queue<br />
                !tracks: Returns a link with all songs available on LHWB<br />
                !current: Displays the current song name along side the user who queued it<br />
                !recent: Displays the 10 most recently played songs<br />
                !rankplays [num]: Displays a list of length 'num' order by most played (default is 5, max of 25)<br />
                !lskip: Skips the current song<br />
                !rejoin: Put's the bot back in it's default voice channel<br />
                <s>!playcount [song]: Displays the play count for the specified song</s> - Not done yet
            </p>
            
            <h4>Album Commands</h4>
            <p>
                !taylorswift/!debut: Displays the track listing for Taylor Swift' (debut).<br />
                !beautifuleyes: Displays the track listing for Beautiful Eyes.<br />
                !fearless: Displays the track listing for Fearless.<br />
                !speaknow: Displays the track listing for Speak Now.<br />
                !red: Displays the track listing for Red.<br />
                !1989: Displays the track listing for 1989.<br />
                !reputation: Displays the track listing for reputation.<br />
                !lover: Displays the track listing for Lover.<br />
                !folklore: Displays the track listing for folklore.<br />
                !evermore: Displays the track listing for evermore.
            </p>
            
            <h4>Tour Commands</h4>
            <p>
                !redguests: Displays the special guests on The Red Tour.<br />
                !redsetlist: Displays The Red Tour typical set list.<br />
                !1989ss: Private messages user the complete list of 1989 World Tour secret songs.<br />
                !1989guests: Displays the special guests on the 1989 World Tour.<br />
                !1989setlist: Displays the 1989 World Tour typical set list.<br />
                !repss: Private messages user the complete list of reputation Stadium Tour secret songs.<br />
                !repguests: Displays the special guests on the reputation Stadium Tour.<br />
                !repsetlist: Displays the reputation Stadium Tour typical set list.
            </p>

            <h4>Misc Commands</h4>
            <p>
                !countdown: provides an embed of relevant Taylor countdowns.<br />
                !danc: replies :thinking:.<br />
                !debtcounter: displays WetPatootie's current oof debt.<br />
                !eyeroll: replies :rolling_eyes:.<br />
                !gif: replies with a random Taylor gif.<br />
                !prefix: replies with the bot's prefix in that server<br />
                !request [gif/album/song]: Logs a user's request for a bot feature or song/gif etc.<br />
                !stream/!livestream: information regarding the stream server.<br />
                !taze: replies with a lightning emoji.<br />
                !wtny: sends the welcome to discord skyline gif.<br />
                !lversion: current version of the bot<br />
                !lhelp: help lookup tool, as well as this website.
            </p>
            
            <h4>Last FM Commands</h4>
            <p>
                !lfm: displays an embed of your profile if set.<br />
                !lfm [user]: displays an embed of @user's profile if set.<br />
                !lfm search [lastfm_user]: displays an embed of a requested lastfm user.<br />
                !lfm set [lastfm_user]: sets your lastfm profile.<br />
                !lfm clear: clears your lastfm profile.
            </p>
            
            <h4>Pinglist Commands</h4>
            <p>
                !lping: Displays the pinglists you're on<br />
                !lping list: Displays the available pinglists<br />
                !lping get [list name]: Adds a pinglist to the users requested pings<br />
                !lping drop [list name]: Removes a pinglist from the users requested pings<br />
                !lping [list to ping]: Pings the list<br />
                !lping create [list name]: Creates a pinglist that users can join<br />
                !lping delete [list name]: Deletes a pinglist entirely
            </p>
            
            <h4>Mod Commands</h4>
            <p>
                !lpause: Tells the bot to start playing music<br />
                !lresume: Tells the bot to stop playing music<br />
                !botban [user]: Bans a user from the bot<br />
                !botunban [user]: Un-Bans a user from the bot<br />
                !channel disable [cmd]: Disable a command in a single channel<br />
                !channel enable [cmd]: Enable a command in a single channel<br />
                !spam add [channel]: Make a channel a spam channel<br />
                !spam remove [channel]: Remove a channel from being a spam channel<br />
                !trusted set [role]: Make a role trusted by the bot for limited access commands<br />
                !trusted clear: Ckear the trusted role<br />
                !lrestart: restarts the bot
            </p>
        </div>
    </body>
</html>
