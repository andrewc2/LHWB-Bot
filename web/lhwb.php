<?php
    $title = "LHWB Available Track Listing";
    $desc = "Songs that are queueable on LosingHimWasBlue [Bot]";
    require_once('includes/header.php');
?>
            <div id="dataDisplay">
                <h1>Song List</h1>
                <table class="table table-striped" id="songList">
                    <thead>
                    <tr>
                        <th>Song Name</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Play Count</th>
                    </tr>
                    </thead>
                    <tbody>
                        <?php
                        $stmt = $db->prepare("SELECT official_name, artist_name, album, play_count FROM songDetail WHERE 1 ORDER BY official_name");
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
