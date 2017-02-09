<?php
require_once "config.php";

$db = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);
$db->set_charset("utf8mb4");
$server = empty($_GET['server']) ? PRIMARY_GUILD : $_GET['server'];
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Red Bot Server</title>
        <meta name="description" content="Music bot information for r/TaylorSwift discord chat"/>
        <style type="text/css">
            body {font-size:11px; color:#ffffff; background-color:#323232; font-family:arial; text-align:center;}
            h1 {font-size:52px; color:#ffffff; margin: 70px 0 50px 0;}
            p {width:400px; text-align:left; margin-left:auto;margin-right:auto; }
            div {width:320px; text-align:center; margin-left:auto;margin-right:auto;}
            a:link {color: #ffffff;}
            a:visited {color: #ffffff;}
            a:active {color: #ffffff;}
            a:hover {color: #ffffff;}
            #dataStore {
                margin-bottom: 10px;
                float: none;
                margin: 0 auto;
                text-align: center;
            }
        </style><!-- links 34536A, h1 555555 else 777777 -->
        <link rel="stylesheet" href="sortable-theme-bootstrap.css" />
    </head>
    <body>
        <h1>LosingHimWasBlue [Bot]</h1>
        <div>
            <a href="http://redbot.tay.rocks/redbot.php?theme=dark">Song List</a><br />
            <a href="http://redbot.tay.rocks/recent.php?theme=dark">Recently Played Songs</a><br />
            <a href="https://github.com/andrewc2/Red-Bot">Github Repository</a>
            <h4>General Commands</h4>
            <p>!q/!queue: Displays the current song queue<br />
            !q/!queue [song]: Adds a song to the current queue<br />
            (queue "Random" and it will pick a random song)<br />
            !tracks: Returns a link with all songs available on LHWB<br />
            !current: Displays the current song name along side the user who queued it<br />
            !recent/!recentlyplayed: Displays the 10 most recently played songs<br />
            !playcount [song]: Displays the play count for the specified song<br />
            !rankplays [num]: Displays a list of length 'num' order by most played (default is 5)</p>
            
            <h4>Mod Commands</h4>
            <p>!rjoin [channel name]: Tells the bot to join a channel<br />
            !play: Tells the bot to start playing music<br />
            !stop: Tells the bot to stop playing music<br />
            !dq/!dequeue [song]: Removes a song from the queue<br />
            !cq/!clearqueue: Removes all songs from the current queue<br />
            !skip: Skips the current song</p>
        </div>
        <br /><br />
        <div id="dataStore">
            <h2>Now Playing:</h2>
            <?php
            $stmt = $db->prepare("SELECT id, name, album, queuedby FROM recent WHERE 1 ORDER BY id DESC LIMIT 1");
            $stmt->bind_param("s", $server);
            $stmt->execute();
            $stmt->bind_result($id, $name, $album, $queuedby);
            while ($stmt->fetch())
            {
                echo "<h3>Song: ".htmlspecialchars($name)."</h3><h3>Album: ".htmlspecialchars($album)."</h3>";
            }
            ?>

        </div>
        <script src="sortable.min.js"></script>
    </body>
</html>
