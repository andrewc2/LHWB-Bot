<?php
require_once "config.php";

$db = new mysqli(DB_HOST,DB_USERNAME,DB_PASSWORD,DB_NAME);
$db->set_charset("utf8mb4");
$server = empty($_GET['server']) ? PRIMARY_GUILD : $_GET['server'];
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Oof Tracker</title>
        <meta name="description" content="Music bot information for r/TaylorSwift discord chat"/>
        <style type="text/css">
            body {font-size:12px; color:#ffffff; background-color:#323232; font-family:arial; text-align:center;}
            h1 {font-size:52px; color:#ffffff; margin: 70px 0 50px 0;}
            p {width:500px; text-align:left; margin-left:auto;margin-right:auto; }
            div {width:370px; text-align:center; margin-left:auto;margin-right:auto;}
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
        <?php
            $stmt = $db->prepare("SELECT counter FROM counters WHERE word='oof'");
            $stmt->bind_param("s", $server);
            $stmt->execute();
            $stmt->bind_result($counter);
            while ($stmt->fetch())
            {
                echo "<h3>".htmlspecialchars($counter)."</h3>";
            }
        ?>
    </body>
</html>
