const FIND_SONG =
    'SELECT * FROM `song_name` INNER JOIN `song_detail` ON `song_name`.song_detail_id = `song_detail`.id WHERE `song_name`.song_name = ?';

const FETCH_ALL_QUEUEABLE_SONGS =
    'SELECT * FROM `song_name` INNER JOIN `song_detail` ON `song_name`.song_detail_id = `song_detail`.id WHERE can_queue = 1';

const ADD_TO_QUEUE =
    'INSERT INTO queue_new (song_detail_id, guild_id, queued_by) VALUES (?,?,?)';

const SEARCH_QUEUE =
    'SELECT * FROM queue_new INNER JOIN song_detail ON queue_new.song_detail_id = song_detail.id WHERE queue_new.guild_id = ? ORDER BY queue_new.id';

const FIND_SONG_IN_QUEUE =
    'SELECT * FROM queue_new INNER JOIN song_detail ON queue_new.song_detail_id = song_detail.id WHERE queue_new.guild_id = ? AND song_detail.id = ?';

const FIND_RANDOM_SONG =
    'SELECT * FROM `song_detail` WHERE autoplay = 1 AND can_queue = 1 AND artist_name = ? ORDER BY RAND() LIMIT 1';

const DELETE_FROM_QUEUE =
    'DELETE FROM queue_new WHERE song_detail_id = ? AND guild_id = ? LIMIT 1';

const CLEAR_QUEUE = 'DELETE FROM queue_new WHERE guild_id = ?';

const UPDATE_RECENT =
    'INSERT INTO recent_new (song_detail_id, guild_id, queued_by) VALUES (?,?,?)';

const UPDATE_PLAY_COUNT =
    'UPDATE song_detail SET play_count = play_count + 1 WHERE id = ?';

const GET_ALBUM =
    'SELECT * FROM song_detail WHERE album = ? AND is_album = 1 ORDER BY track_number';

const QUEUE_ALBUM =
    'INSERT INTO queue_new (song_detail_id, guild_id, queued_by) VALUES ?';

const GET_RECENT =
    'SELECT * FROM recent_new INNER JOIN song_detail ON recent_new.song_detail_id = song_detail.id WHERE recent_new.guild_id = ? ORDER BY recent_new.id DESC LIMIT ?';

const RANK_PLAYS =
    'SELECT * FROM song_detail WHERE play_count > 0 ORDER BY play_count DESC LIMIT ?';

module.exports = { FIND_SONG, FETCH_ALL_QUEUEABLE_SONGS, ADD_TO_QUEUE,
	SEARCH_QUEUE, FIND_SONG_IN_QUEUE, FIND_RANDOM_SONG, DELETE_FROM_QUEUE,
	CLEAR_QUEUE, UPDATE_RECENT, UPDATE_PLAY_COUNT, GET_ALBUM, QUEUE_ALBUM,
	GET_RECENT, RANK_PLAYS };
