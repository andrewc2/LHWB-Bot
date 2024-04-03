export const FIND_TRACK = 'SELECT * FROM songDetail WHERE official_name = ? LIMIT 1';

export const TRACK_AUTOCOMPLETE =
    'SELECT * FROM songName INNER JOIN songDetail ON songName.song_detail_id = songDetail.id WHERE songName.song_name LIKE ? LIMIT 5';

export const ADD_TO_QUEUE =
    'INSERT INTO songQueue (song_detail_id, guild_id, queued_by) VALUES (?,?,?)';

export const SEARCH_QUEUE =
    'SELECT * FROM songQueue INNER JOIN songDetail ON songQueue.song_detail_id = songDetail.id WHERE songQueue.guild_id = ? ORDER BY songQueue.id';

export const FIND_SONG_IN_QUEUE =
    'SELECT * FROM songQueue INNER JOIN songDetail ON songQueue.song_detail_id = songDetail.id WHERE songQueue.guild_id = ? AND songDetail.id = ?';

export const FIND_RANDOM_SONG =
    'SELECT * FROM songDetail WHERE autoplay = 1 AND can_queue = 1 AND artist_name = ? ORDER BY RAND() LIMIT 1';

export const DELETE_FROM_QUEUE =
    'DELETE FROM songQueue WHERE song_detail_id = ? AND guild_id = ? LIMIT 1';

export const CLEAR_QUEUE = 'DELETE FROM songQueue WHERE guild_id = ?';

export const UPDATE_RECENT =
    'INSERT INTO songRecent (song_detail_id, guild_id, queued_by) VALUES (?,?,?)';

export const UPDATE_PLAY_COUNT =
    'UPDATE songDetail SET play_count = play_count + 1 WHERE id = ?';

export const GET_ALBUM =
    'SELECT * FROM songDetail WHERE album = ? AND is_album = 1 ORDER BY track_number';

export const ALBUM_AUTOCOMPLETE =
    'SELECT DISTINCT `album`, `artist_name` FROM songDetail WHERE `is_album` = ? AND `album` LIKE ? LIMIT 10';

export const QUEUE_ALBUM =
    'INSERT INTO songQueue (song_detail_id, guild_id, queued_by) VALUES ?';

export const GET_RECENT =
    'SELECT * FROM songRecent INNER JOIN songDetail ON songRecent.song_detail_id = songDetail.id WHERE songRecent.guild_id = ? ORDER BY songRecent.id DESC LIMIT ?';

export const GET_HISTORY =
    'SELECT * FROM songUserListen INNER JOIN songDetail ON songUserListen.song_detail_id = songDetail.id WHERE songUserListen.user_id = ? ORDER BY songUserListen.date DESC LIMIT ?';

export const RANK_PLAYS =
    'SELECT * FROM songDetail WHERE play_count > 0 ORDER BY play_count DESC LIMIT ?';

export const INSERT_INTO_SONG_USER_LISTEN =
    'INSERT INTO songUserListen (user_id, song_detail_id) VALUES ?';

export const INSERT_MANY_USERS =
    'INSERT IGNORE INTO `user` (userID) VALUES ?';

export const GET_QUEUEABLE_ALBUMS = 'SELECT album, artist_name FROM songDetail WHERE is_album = 1 GROUP BY album, artist_name';

