<?php
require_once "config.php";

$db = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);
$db->set_charset("utf8mb4");
$server = empty($_GET['server']) ? PRIMARY_GUILD : $_GET['server'];
?>
<!DOCTYPE html>
<html>
    <head>
        <title>LHWB Server</title>
        <meta name="description" content="Music bot information for r/TaylorSwift discord chat"/>
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
            <div class='nowplaying'>Now Playing: &nbsp;</div>
            <?php
            $stmt = $db->prepare("SELECT id, name, album, queuedby FROM recent WHERE 1 ORDER BY id DESC LIMIT 1");
            $stmt->bind_param("s", $server);
            $stmt->execute();
            $stmt->bind_result($id, $name, $album, $queuedby);
            while ($stmt->fetch())
            {
                echo " <div class='nowplaying'>".htmlspecialchars($name)."<br />Album: &nbsp;".htmlspecialchars($album)."<br />Total number of songs played: &nbsp;".htmlspecialchars($id)."</div>";
            }
            ?>
        </div>

        <div id="commands">
            <h4>Music Commands</h4>
            <p>!q/!queue: Displays the current song queue (only available in #bots)<br />
            !q/!queue [song]: Adds a song to the current queue (only available in #bots)<br />
            !tracks: Returns a link with all songs available on LHWB<br />
            !current: Displays the current song name along side the user who queued it<br />
            !recent/!recentlyplayed: Displays the 10 most recently played songs<br />
            !playcount [song]: Displays the play count for the specified song<br />
            !rankplays [num]: Displays a list of length 'num' order by most played (default is 5)</p>
            
            <h4>Album Commands</h4>
            <p>!taylorswift/!debut: Displays the track listing for Taylor Swift' (debut).<br />
            !beautifuleyes: Displays the track listing for Beautiful Eyes.<br />
            !fearless: Displays the track listing for Fearless.<br />
            !speaknow: Displays the track listing for Speak Now.<br />
            !red: Displays the track listing for Red.<br />
            !1989: Displays the track listing for 1989.<br />
            !reputation: Displays the track listing for reputation.<br />
            !lover: Displays the track listing for Lover.<br />
            !folklore: Displays the track listing for folklore.
            </p>
            
            <h4>Misc Commands</h4>
            <p>!lhelp: links to this website.<br />
            !danc: replies :thinking:.<br />
            !eyeroll: replies :rolling_eyes:.<br />
            !gif: replies with a random Taylor gif.<br />
            !wtyn: sends the welcome to discord skyline gif.<br />
            !debtcounter: displays WetPatootie's current oof debt.<br />
            !stream/!livestream: information regarding the stream server.<br />
            !countdown: provides an embed of relevant Taylor countdowns.<br />
            !lhelp: returns this website link.
            </p>
            
            <h4>Last FM Commands</h4>
            <p>!lfm: displays an embed of your profile if set.<br />
            !lfm @user: displays an embed of @user's profile if set.<br />
            !lfm search lastfm_user: displays an embed of a requested lastfm user.<br />
            !lfm set user: sets your lastfm profile.<br />
            !lfm clear: clears your lastfm profile.<br />
            !lfm -h: displays help dialog embed.
            </p>
            
            <h4>Tour Commands</h4>
            <p>
            !redsetlist: Displays The Red Tour typical set list.<br />
            !redguests: Displays the special guests on The Red Tour.<br />
            !1989ss: Private messages user the complete list of 1989 World Tour secret songs.<br />
            !1989setlist: Displays the 1989 World Tour typical set list.<br />
            !1989guests: Displays the special guests on the 1989 World Tour.<br />
            !repsetlist: Displays the reputation Stadium Tour typical set list.<br />
            !repguests: Displays the special guests on the reputation Stadium Tour.<br />
            !repss: Private messages user the complete list of reputation Stadium Tour secret songs.
            </p>
            
            <h4>Mod Commands</h4>
            <p><!--!ljoin [channel name]: Tells the bot to join a channel<br />-->
            !lplay: Tells the bot to start playing music<br />
            !lstop: Tells the bot to stop playing music<br />
            !lskip: Skips the current song<br />
            !dq/!dequeue [song]: Removes a song from the queue<br />
            !cq/!clearqueue: Removes all songs from the current queue<br />
            !musicversion: current version of the music bot<br />
            !musicrestart: restarts the music bot<br />
            !lversion: current version of the utility bot<br />
            !lrestart: restarts the utility bot</p>
        </div>
    </body>
</html>
