<?php
require_once "config.php";

$db = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);
$db->set_charset("utf8");
?>
<!DOCTYPE html>
<html>
<head>
    <!-- Primary Meta Tags -->
    <title>r/TaylorSwift Discord Event Calendar</title>
    <meta name="title" content="r/TaylorSwift Discord Event Calendar">
    <meta name="description" content="Upcoming events on the r/TaylorSwift Discord">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://lhwb.dev/lhwb.php">
    <meta property="og:title" content="r/TaylorSwift Discord Event Calendar">
    <meta property="og:description" content="Upcoming events on the r/TaylorSwift Discord">
    <meta property="og:image" content="https://i.imgur.com/NxrK0v4.jpeg">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://lhwb.dev/lhwb.php">
    <meta property="twitter:title" content="r/TaylorSwift Discord Event Calendar">
    <meta property="twitter:description" content="Upcoming events on the r/TaylorSwift Discord">
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
    
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jq-2.2.4/dt-1.10.13/datatables.min.css"/>
    <link rel="stylesheet" type="text/css" href="darkly.css"/>
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
    <h3>r/Taylor Swift Discord Event Calendar</h1>
    <iframe src="https://calendar.google.com/calendar/b/1/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=bWkwdjF0czlkbDdtNmcxMnUyaDBzbHJicDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23616161&amp;showTitle=0&amp;showNav=1&amp;showPrint=0&amp;showTabs=1&amp;showCalendars=0&amp;title=r%2FTaylorSwift" style="border-width:0" width="1140" height="600" frameborder="0" scrolling="no"></iframe>
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
