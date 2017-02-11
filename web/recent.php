<?php
require_once "config.php";

$db = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);
$db->set_charset("utf8");
?>
<!DOCTYPE html>
<html>
<head>
    <title>RedBot Song Listing</title>
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
                <a class="navbar-brand" href="#">RedBot</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="redbot.php">Song List</a></li>
                    <li><a href="recent.php">Recently Played Songs</a></li>
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
            $stmt = $db->prepare("SELECT id, name, album, queuedby FROM recent WHERE 1 ORDER BY id DESC LIMIT 26");
            $stmt->execute();
            $stmt->bind_result($id, $name, $album, $queuedby);
            while ($stmt->fetch()) {
                echo "<tr><td>".htmlspecialchars($name)."</td><td>".htmlspecialchars($album)."</td><td>".htmlspecialchars($queuedby)."</td></tr>";
            }
            ?>
        <tfoot>
        <tr>
            <th>Song Name</th>
            <th>Album</th>
            <th>Queued By</th>
        </tr>
        </tfoot>
    </table>
</div>
</div>
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jq-2.2.4/dt-1.10.13/datatables.min.js"></script>
</body>
</html>
