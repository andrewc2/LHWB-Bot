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
    <title>LHWB Recently Played Tracks</title>
    <meta name="title" content="LHWB Recently Played Tracks">
    <meta name="description" content="Songs that have recently played on LosingHimWasBlue [Bot]">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://lhwb.dev/lhwb.php">
    <meta property="og:title" content="LHWB Recently Played Tracks">
    <meta property="og:description" content="Songs that have recently played on LosingHimWasBlue [Bot]">
    <meta property="og:image" content="https://i.imgur.com/NxrK0v4.jpeg">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://lhwb.dev/lhwb.php">
    <meta property="twitter:title" content="LHWB Recently Played Tracks">
    <meta property="twitter:description" content="Songs that have recently played on LosingHimWasBlue [Bot]">
    <meta property="twitter:image" content="https://i.imgur.com/NxrK0v4.jpeg">

    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jq-2.2.4/dt-1.10.13/datatables.min.css"/>
    <link rel="stylesheet" type="text/css" href="darkly.css"/>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-EJ2HKNBZ1B"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-EJ2HKNBZ1B');
    </script>
    
</head>
<body>
<div class="container">
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">LHWB</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="lhwb.php">Song List</a></li>
                    <li><a href="recent.php">Recently Played Songs</a></li>
                    <li><a href="calendar.php">Event Calendar</a></li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
<div id="recentDisplay">
    <h1>Recently Played Songs</h1>
    <table class="table table-striped" id="recentList">
        <thead>
        <tr>
            <th>Song Name</th>
            <th>Album</th>
            <th>Queued By</th>
        </tr>
        </thead>

         

        <tbody>
            <?php
            $stmt = $db->prepare("SELECT recent_new.id, recent_new.song_detail_id, recent_new.queued_by, song_detail.official_name, song_detail.album FROM recent_new
            INNER JOIN song_detail ON recent_new.song_detail_id = song_detail.id WHERE 1 AND guild_id = ? ORDER BY id DESC LIMIT 26");
            $stmt->bind_param("s", $server);
            $stmt->execute();
            $stmt->bind_result($id, $detail_id, $queuedby, $name, $album);
            while ($stmt->fetch()) {
                echo "<tr><td>".htmlspecialchars($name)."</td><td>".htmlspecialchars($album)."</td><td>".htmlspecialchars($queuedby)."</td></tr>";
            }
            ?>
    </table>
</div>
</div>
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jq-2.2.4/dt-1.10.13/datatables.min.js"></script>
</body>
</html>
