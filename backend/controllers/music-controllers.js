import db from "../db/conn.js";
import { verifySong } from "../functions/utils.js";
import { getPlaylist, getSongByUrl } from "../functions/youtube-api.js";
import { validateConfig } from "../models/config.js";
import { validateRequestSong } from "../models/request-song.js";
import { validatePartialSong, validateSong } from "../models/song.js";
import {validatePartialParams} from "../models/search-songs.js";
async function getSongs(req, res) {
    const filterParams = req.query;
    const result = validatePartialParams(filterParams);
    if(result.error) return res.status(400).json({type: "wrong_filters", error: JSON.parse(result.error.message)});
    const filters = Object.entries(result.data).map(([key, value]) => `${key} = $${key}`).join(" AND ");
    let query = ""
    if(filters) query = `WHERE ${filters}`;
    
    const transaction = await db.transaction("read");
    transaction.execute({
        sql: `SELECT * FROM songs ${query} ORDER BY position ASC`,
        args: result.data
    }).then(songs => {
        transaction.commit();
        res.json(songs.rows);
    }).catch(error => {
        transaction.close();
        res.status(500).json({error: "An error unexpected"})
    })
}

async function addSong(req, res) {
    const result = validateRequestSong(req.body);
    if(result.error) return res.status(400).json({type: "invalid_url", error: JSON.parse(result.error.message)});
    if(/https:\/\/www.youtube.com\/watch\?v=[a-zA-Z0-9_-]{11}/.test(result.data.url)) {
        const id = result.data.url.replace(/https:\/\/www.youtube.com\/watch\?v=/g, "").trim();
        if(!id || /w{11}/.test(id)) return res.status(400).json({type: "invalid_url", error: "Its not a valid youtube url"});
        const song = await getSongByUrl(id).catch(error => {
            return res.status(500).json({error: error});
        });
        const transaction = await db.transaction("write");
        try {
            const {rows: songs} = await transaction.execute("SELECT video_id from songs");
            if(songs.find(s => s["video_id"] === id)){
                transaction.close();
                return res.status(400).json({type: "song_exist", error: "The song are in the list"});
            }
            const {rows: config} = await transaction.execute("SELECT * FROM config");
            if(config.length <= 0) {
                transaction.close();
                return res.status(404).json({type: "not_config", error: "There isn't config"});
            }
            if(songs.length > config[0]['queue_limit']) {
                transaction.close();
                return res.status(400).json({type: "list_full", error: "The song list is full"});
            }
            const verified = verifySong(config[0], song);
            if(!verified.success) {
                transaction.close();
                return res.status(400).json({type: verified.type, error: verified.error});
            }
            const newSong = validateSong({
                video_id: id,
                url: result.data.url,
                title: song.title,
                artist: song.artist,
                duration: `${verified.duration.minutes.padStart(2, "0")}:${verified.duration.seconds.padStart(2, "0")}`,
                user: result.data.user
            });
            if(newSong.error) return res.status(400).json({error: JSON.parse(newSong.error.message)});
            transaction.execute({
                sql: 'INSERT INTO songs VALUES($position, $video_id, $url, $title, $artist, $duration, $user, $date)',
                args: {
                    position: songs.length +1,
                    date: new Date().toISOString(),
                    ...newSong.data
                }
            });
            transaction.commit();
            return res.status(201).json({type: "individual_song", sucess: "song added to list", song: newSong.data, position: songs.length +1});
        } catch(error) {
            transaction.close();
            return res.status(500).json({error: "An error to add song"});
        }
    } else if(/https:\/\/www.youtube.com\/playlist\?list=[a-zA-Z0-9_-]{11}/.test(result.data.url)) {
        const id = result.data.url.replace(/https:\/\/www.youtube.com\/playlist\?list=/g, "").trim();
        if(result.error) return res.status(400).json({type: "invalid_url", error: JSON.parse(result.error.message)});
        let songs = await getPlaylist(id).catch(error => {
            return res.status(500).json({error: error});
        });

        const transaction = await db.transaction("write");

        try {
            const {rows: videos} = await transaction.execute('SELECT * FROM songs').catch(error => {
                return res.status(500).json({error: 'An error unexpected'});
            });
            const unrepeatableSongs = [];
            for(let i  = 0; i < songs.length; i++) {
                const index = videos.findIndex(video => video['video_id'] === songs[i].videoId);
                if(index === -1) unrepeatableSongs.push(songs[i]);
            }
            if(!unrepeatableSongs.length) return res.status(400).json({ type: "songs_exist", error: "All songs in the playlist they're in the list"});

            const {rows: config} = await transaction.execute("SELECT * FROM config");
            if(config.length <= 0) {
                transaction.close();
                return res.status(404).json({type: "not_config", error: "There isn't config"});
            }
            if(videos.length > config[0]['queue_limit']) {
                transaction.close();
                return res.status(400).json({type: "list_full", error: "The song list is full"});
            }

            let newSongs = [];
            for(let i = 0; i < unrepeatableSongs.length; i++) {
                const verified = verifySong(config[0], unrepeatableSongs[i]);
                if(!verified.success) continue;
                const newSong = validateSong({
                    video_id: unrepeatableSongs[i].videoId,
                    url: `https://www.youtube.com/watch?v=${unrepeatableSongs[i].videoId}`,
                    title: unrepeatableSongs[i].title,
                    artist: unrepeatableSongs[i].artist,
                    duration: `${verified.duration.minutes.padStart(2, "0")}:${verified.duration.seconds.padStart(2, "0")}`,
                    user: result.data.user
                });

                if(newSong.error) continue;

                newSongs.push({
                    sql: 'INSERT INTO songs VALUES ($position, $video_id, $url, $title, $artist, $duration, $user, $created_at)',
                    args: {
                        position: videos.length + i + 1,
                        created_at: new Date().toISOString(),
                        ...newSong.data
                    }
                });
            }
            if(!newSongs.length) return res.status(400).json({ type: "songs_verification", error: "no song passed the verification"});
            await transaction.batch(
                newSongs,
                "write"
            );
            transaction.commit();
            return res.status(201).json({ type: "playlist", sucess: "playlist added"});
        } catch(error) {
            return res.status(500).json({error: "An unexpected error has ocurred to add songs"});
        }
    } else {
        return res.status(400).json({type: "invalid_url", error: "Its not a valid youtube url"});
    }
}

async function moveSong(req, res) {
    const {position} = req.query;
    if(!position) return res.status(400).json({type: "required_error", error: "The position field its required"});
    if(!Number.isInteger(Number.parseInt(position))) return res.status(400).json({type: "invalid_type", error: "The position field must be a integer number"});
    const transaction = await db.transaction("write");
    try {
        const songs = await transaction.execute(`SELECT video_id, title FROM songs ORDER BY position ASC`);
        if(position <= 2) return res.status(400).json({type: "top_song", error: "That song actually is on the top"});

        const song = songs.rows[position -1];

        if(!song) return res.status(400).json({type: "not_exist", error: "The position exceeds the total songs or position not exist"});

        await transaction.execute({
            sql: `UPDATE songs SET position = position +1 WHERE position < $position AND position >= $newPosition`,
            args: {position, newPosition: 2}
        });

        await transaction.execute({
            sql: `UPDATE songs SET position = $newPosition WHERE video_id = $videoId`,
            args: {newPosition: 2, videoId: song.video_id}
        });
        await transaction.commit();
        return res.json({success: "Song moved to top", song: song.title});
    } catch(error) {
        await transaction.close();
        return res.status(500).json({error: "An error unexpected"});
    }
}


async function promoteSong(req, res) {
    const {position} = req.query;
    if(!position) return res.status(400).json({type: "required_error", error: "The position field its required"});
    if(!Number.isInteger(Number.parseInt(position))) return res.status(400).json({type: "invalid_type", error: "The position field must be a integer number"});
    const transaction = await db.transaction("write");
    try {
        const songs = await transaction.execute(`SELECT video_id, title FROM songs ORDER BY position ASC`);
        if(position <= 1) return res.status(400).json({type: "top_song", error: "That song actually is on the top"});

        const song = songs.rows[position -1];

        if(!song) return res.status(400).json({type: "not_exist", error: "The position exceeds the total songs or position not exist"});

        await transaction.execute({
            sql: `UPDATE songs SET position = position +1 WHERE position < $position AND position >= $newPosition`,
            args: {position, newPosition: 1}
        });

        await transaction.execute({
            sql: `UPDATE songs SET position = $newPosition WHERE video_id = $videoId`,
            args: {newPosition: 1, videoId: song.video_id}
        });
        await transaction.commit();
        return res.json({success: "Song moved to top", song: song.title});
    } catch(error) {
        await transaction.close();
        return res.status(500).json({error: "An error unexpected"});
    }
}


async function deleteSong(req, res) {
    const {position} = req.query;
    if(!position) return res.status(400).json({type: "required_error", error: "The position field its required"});
    if(!Number.isInteger(Number.parseInt(position))) return res.status(400).json({type: "invalid_type", error: "The position field must be a integer number"});
    const transaction = await db.transaction("write");

    try {
        const songs = await transaction.execute(`SELECT video_id, title FROM songs ORDER BY position ASC`);
        const song = songs.rows[position -1];
        if(!song) return res.status(400).json({type: "not_exist", error: "The position exceeds the total songs or position not exist"});
        if(position != songs.rows.length) {
            await transaction.execute({
                sql: 'UPDATE songs SET position = position -1 WHERE position > $position',
                args: {position}
            });
        }
        await transaction.execute({
            sql: 'DELETE FROM songs WHERE video_id = $videoId',
            args: {videoId: song.video_id}
        });
        await transaction.commit();
        return res.json({success: "Song deleted", song: song.title});
    } catch(error) {
        await transaction.close();
        return res.status(500).json({error: "An error unexpected"})
    }
}

async function getConfig(req, res) {
    db.execute('SELECT * FROM config').then(config => {
        res.json(config.rows[0]);
    }).catch(error => {
        res.status(500).json({error: "An error unexpected"})
    })
}

async function updateConfig(req, res) {
    const result = validateConfig(req.body);
    if(result.error) return res.status(400).json({type: 'invalid_object', error: JSON.parse(result.error.message)});
    
    const transaction = await db.transaction("write");
    const fields = Object.entries(result.data).map(([key, value]) => `${key} = $${key}`).join(', ');
    await transaction.execute({
        sql: `UPDATE config SET ${fields}`,
        args: result.data
    }).then(() => {
        transaction.commit();
        return res.json({success: "Config updated"});
    }).catch(error => {
        transaction.close();
        return res.status(500).json({error: 'An error unexpected to update config'});
    });
}

async function clearList(req, res) {
    const transaction = await db.transaction("write")
    transaction.execute('DELETE FROM songs').then(() => {
        return res.json({success: 'list clean'});
    }).catch(error => {
        return res.status(500).json({error: "An error unexpected has ocurred to clear music list"});
    });
}
export {getSongs, addSong, moveSong, deleteSong, getConfig, updateConfig, clearList, promoteSong}