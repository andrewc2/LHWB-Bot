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
