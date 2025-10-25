<?php
    $title = "User Listening History";
    $desc = "Songs listened to on LosingHimWasBlue [Bot]";
    require_once('includes/header.php');
?>
            <div id="dataDisplay">
                <h1>User Listening History</h1>
                <table class="table table-striped" id="songList">
                    <thead>
                    <tr>
                        <th>Song Name</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Listen Date</th>
                    </tr>
                    </thead>

                    <tbody>
                        <?php
                        $stmt = $db->prepare("SELECT songUserHistory.id, songUserHistory.songId, songUserHistory.date, song.officialName, song.artistName, song.albumName FROM songUserHistory
                        INNER JOIN song ON songUserHistory.songId = song.id WHERE 1 AND userId = ? ORDER BY id DESC");
                        $stmt->bind_param("s", $user);
                        $stmt->execute();
                        $stmt->bind_result($id, $detail_id, $listen_date, $name, $artist, $album);
                        while ($stmt->fetch()) {
                            echo "<tr><td>".htmlspecialchars($name)."</td><td>".htmlspecialchars($artist)."</td><td>".htmlspecialchars($album)."</td><td>".htmlspecialchars($listen_date)."</td></tr>";
                        }
                        ?>
                </table>
            </div>
        </div>
        <script>
            $(document).ready(function() {
            $('#songList').DataTable({
                "iDisplayLength": 25,
                order: [[3, 'desc']],
                "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]]
            });
            });
        </script>
    </body>
</html>
