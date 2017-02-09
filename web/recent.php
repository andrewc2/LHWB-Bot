<?php
require_once "config.php";

$db = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);
$db->set_charset("utf8mb4");
$server = empty($_GET['server']) ? PRIMARY_GUILD : $_GET['server'];
?>
<!DOCTYPE html>
<html>
    <head>
        <title>RedBot Recently Played</title>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">

        <?php
        if ($_GET['theme']=="light") {
            echo '<link rel="stylesheet" href="sortable-theme-bootstrap.css" />';
            $theme = "sortable-theme-bootstrap";
        } else {
            echo '<link rel="stylesheet" href="sortable-theme-dark.css" />';
            echo '<link rel="stylesheet" href="dark.css" />';
            $theme = "sortable-theme-dark";
        }
        ?>
        <style type="text/css">
        #dataStore {
            margin-bottom: 10px;
            float: none;
            margin: 0 auto;
            text-align: center;
        }
        </style>
    </head>
    <body>
        <div id="dataStore">
            <h1>RedBot Recently Played Songs</h1>
            <a href="http://redbot.tay.rocks/">Home</a><br /><br />
            <table class="<?php echo $theme; ?>" data-sortable>
                <thead>
                <tr>
                    <th>Song Name</th>
                    <th>Album</th>
                    <th>Queued By</th>
                </tr>
                </thead>
                <tbody>
                <?php
                $stmt = $db->prepare("SELECT id, name, album, queuedby FROM recent WHERE 1 ORDER BY id DESC");
                $stmt->bind_param("s", $server);
                $stmt->execute();
                $stmt->bind_result($id, $name, $album, $queuedby);
                while ($stmt->fetch())
                {
                    echo "<tr><td>".htmlspecialchars($name)."</td><td>".htmlspecialchars($album)."</td><td>".$queuedby."</td></tr>";
                }
                ?>
                </tbody>
            </table>
        </div>
        <script src="sortable.min.js"></script>
    </body>
</html>
