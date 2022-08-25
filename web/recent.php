<?php
    $title = "LHWB Recently Played Tracks";
    $desc = "Songs that have recently played on LosingHimWasBlue [Bot]";
    require_once('includes/header.php');
?>
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
                        $stmt = $db->prepare("SELECT songRecent.id, songRecent.song_detail_id, songRecent.queued_by, songDetail.official_name, songDetail.album FROM songRecent
                        INNER JOIN songDetail ON songRecent.song_detail_id = songDetail.id WHERE 1 AND guild_id = ? ORDER BY id DESC LIMIT 26");
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
    </body>
</html>
