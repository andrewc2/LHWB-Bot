<?php
require_once "config.php";

$db = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);
$db->set_charset("utf8mb4");
$server = empty($_GET['server']) ? PRIMARY_GUILD : $_GET['server'];
?>
<!DOCTYPE html>
<html>
    <head>
        <title>RedBot Song Listing</title>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">

        <?php
        if ($_GET['theme']=="dark") {
            echo '<link rel="stylesheet" href="sortable-theme-dark.css" />';
            echo '<link rel="stylesheet" href="dark.css" />';
            $theme = "sortable-theme-dark";
        } else {
            echo '<link rel="stylesheet" href="sortable-theme-bootstrap.css" />';
            $theme = "sortable-theme-bootstrap";
        }
        ?>
        <style type="text/css">
        #dataStore {
            margin-bottom: 10px;
            float:left;
        }
        #channelStats {
            float:left;
            margin-left: 10px;
            margin-bottom: 10px;
        }
        </style>
    </head>
    <body>
        <div id="dataStore">
            <h1>RedBot Song Listing</h1>
            <table class="<?php echo $theme; ?>" data-sortable>
                <thead>
                <tr>
                    <th>Song Name</th>
                    <th>Album</th>
                    <th>Play Count</th>
                </tr>
                </thead>
                <tbody>
                <?php
                $stmt = $db->prepare("SELECT name, album, playcount FROM music WHERE 1 ORDER BY name");
                $stmt->bind_param("s", $server);
                $stmt->execute();
                $stmt->bind_result($name, $album, $playcount);
                while ($stmt->fetch())
                {
                    echo "<tr><td>".htmlspecialchars($name)."</td><td>".htmlspecialchars($album)."</td><td>".$playcount."</td></tr>";
                }
                ?>
                </tbody>
            </table>
        </div>
        <script src="sortable.min.js"></script>
    </body>
</html>
