<?php 
    global $title;
    global $desc;
  
    require_once "config.php";

    $db = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);
    $db->set_charset("utf8mb4");
    $server = empty($_GET['server']) ? PRIMARY_GUILD : $_GET['server'];
?>

<!DOCTYPE html>
    <html>
        <head>
            <!-- Primary Meta Tags -->
            <title><?php echo isset($title) ? $title : "LosingHimWasBlue [Bot] - Discord Bot"; ?></title>
            <meta name="title" content="<?php echo isset($title) ? $title : "LosingHimWasBlue [Bot]"; ?>">
            <meta name="description" content="<?php echo isset($desc) ? $desc : "LosingHimWasBlue | A multi-purpose music and utility Discord bot for Taylor Swift related servers, with user joinable pinglists, last.fm, and album metadata."; ?>">
            <link rel="shortcut icon" type="image/jpg" href="favicon.ico"/>

            <!-- Open Graph / Facebook -->
            <meta property="og:type" content="website">
            <meta property="og:url" content="https://lhwb.dev/lhwb.php">
            <meta property="og:title" content="<?php echo isset($title) ? $title : "LosingHimWasBlue [Bot] - Discord Bot"; ?>">
            <meta property="og:description" content="<?php echo isset($desc) ? $desc : "LosingHimWasBlue | A multi-purpose music and utility Discord bot for Taylor Swift related servers, with user joinable pinglists, last.fm, and album metadata."; ?>">
            <meta property="og:image" content="https://i.imgur.com/NxrK0v4.jpeg">

            <!-- Twitter -->
            <meta property="twitter:card" content="summary_large_image">
            <meta property="twitter:url" content="https://lhwb.dev/lhwb.php">
            <meta property="twitter:title" content="<?php echo isset($title) ? $title : "LosingHimWasBlue [Bot] - Discord Bot"; ?>">
            <meta property="twitter:description" content="<?php echo isset($desc) ? $desc : "LosingHimWasBlue | A multi-purpose music and utility Discord bot for Taylor Swift related servers, with user joinable pinglists, last.fm, and album metadata."; ?>">
            <meta property="twitter:image" content="https://i.imgur.com/NxrK0v4.jpeg">

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
                            <a class="navbar-brand" href="index.php">LosingHimWasBlue [Bot]</a>
                        </div>

                        <!-- Collect the nav links, forms, and other content for toggling -->
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul class="nav navbar-nav">
                                <li><a href="index.php">Home</a></li>
                                <li><a href="lhwb.php">Song List</a></li>
                                <li><a href="recent.php">Recently Played Songs</a></li>
                                <li><a href="privacy.php">Privacy Policy</a></li>
                                <li><a href="https://github.com/andrewc2/Red-Bot">Github</a></li>
                            </ul>
                        </div><!-- /.navbar-collapse -->
                    </div><!-- /.container-fluid -->
                </nav>