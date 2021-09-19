<?php
require_once "config.php";

$db = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);
$db->set_charset("utf8");
?>
<!DOCTYPE html>
<html>
<head>
    <!-- Primary Meta Tags -->
    <title>LHWB Available Track Listing</title>
    <meta name="title" content="LHWB Available Track Listing">
    <meta name="description" content="Songs that are queueable on LosingHimWasBlue [Bot]">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://lhwb.dev/lhwb.php">
    <meta property="og:title" content="LHWB Available Track Listing">
    <meta property="og:description" content="Songs that are queueable on LosingHimWasBlue [Bot]">
    <meta property="og:image" content="https://i.imgur.com/NxrK0v4.jpeg">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://lhwb.dev/lhwb.php">
    <meta property="twitter:title" content="LHWB Available Track Listing">
    <meta property="twitter:description" content="Songs that are queueable on LosingHimWasBlue [Bot]">
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
<div id="dataDisplay">
    <h1>Song List</h1>
    <table class="table table-striped" id="songList">
        <thead>
        <tr>
            <th>Song Name</th>
            <th>Album</th>
            <th>Play Count</th>
        </tr>
        </thead>
        <tbody>
            <?php
            $stmt = $db->prepare("SELECT official_name, artist_name, album, play_count FROM song_detail WHERE 1 ORDER BY official_name");
            $stmt->execute();
            $stmt->bind_result($name, $artist, $album, $playcount);
            while ($stmt->fetch()) {
                echo "<tr><td>".htmlspecialchars($name)."</td><td>".htmlspecialchars($artist)."</td><td>".htmlspecialchars($album)."</td><td>".htmlspecialchars($playcount)."</td></tr>";
            }
            ?>
        <tfoot>
        <tr>
            <th>Song Name</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Play Count</th>
        </tr>
        </tfoot>
    </table>
</div>
</div>
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jq-2.2.4/dt-1.10.13/datatables.min.js"></script>
<script>
    $(document).ready(function() {
       $('#songList').DataTable({
           "iDisplayLength": 25,
           "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]]
       });
    });
</script>
</body>
</html>
