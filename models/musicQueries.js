const FIND_SONG =
    'SELECT * FROM songName INNER JOIN songDetail ON songName.song_detail_id = songDetail.id WHERE songName.song_name = ?';

const FETCH_ALL_QUEUEABLE_SONGS =
    'SELECT * FROM songName INNER JOIN songDetail ON songName.song_detail_id = songDetail.id WHERE can_queue = 1';

const ADD_TO_QUEUE =
    'INSERT INTO songQueue (song_detail_id, guild_id, queued_by) VALUES (?,?,?)';

const SEARCH_QUEUE =
    'SELECT * FROM songQueue INNER JOIN songDetail ON songQueue.song_detail_id = songDetail.id WHERE songQueue.guild_id = ? ORDER BY songQueue.id';

const FIND_SONG_IN_QUEUE =
    'SELECT * FROM songQueue INNER JOIN songDetail ON songQueue.song_detail_id = songDetail.id WHERE songQueue.guild_id = ? AND songDetail.id = ?';

const FIND_RANDOM_SONG =
    'SELECT * FROM songDetail WHERE autoplay = 1 AND can_queue = 1 AND artist_name = ? ORDER BY RAND() LIMIT 1';

const DELETE_FROM_QUEUE =
    'DELETE FROM songQueue WHERE song_detail_id = ? AND guild_id = ? LIMIT 1';

const CLEAR_QUEUE = 'DELETE FROM songQueue WHERE guild_id = ?';

const UPDATE_RECENT =
    'INSERT INTO songRecent (song_detail_id, guild_id, queued_by) VALUES (?,?,?)';

const UPDATE_PLAY_COUNT =
    'UPDATE songDetail SET play_count = play_count + 1 WHERE id = ?';

const GET_ALBUM =
    'SELECT * FROM songDetail WHERE album = ? AND is_album = 1 ORDER BY track_number';

const QUEUE_ALBUM =
    'INSERT INTO songQueue (song_detail_id, guild_id, queued_by) VALUES ?';

const GET_RECENT =
    'SELECT * FROM songRecent INNER JOIN songDetail ON songRecent.song_detail_id = songDetail.id WHERE songRecent.guild_id = ? ORDER BY songRecent.id DESC LIMIT ?';

const RANK_PLAYS =
    'SELECT * FROM songDetail WHERE play_count > 0 ORDER BY play_count DESC LIMIT ?';

module.exports = { FIND_SONG, FETCH_ALL_QUEUEABLE_SONGS, ADD_TO_QUEUE,
  SEARCH_QUEUE, FIND_SONG_IN_QUEUE, FIND_RANDOM_SONG, DELETE_FROM_QUEUE,
  CLEAR_QUEUE, UPDATE_RECENT, UPDATE_PLAY_COUNT, GET_ALBUM, QUEUE_ALBUM,
  GET_RECENT, RANK_PLAYS };
