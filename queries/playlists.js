import db from "../db/client.js";

export const createPlaylist = async (name, description) => {
    const sql = `
    insert into playlists (name, description)
    values ($1, $2)
    returning *
    `;
    const values = [name, description];
    const {rows: [playlist]} = await db.query(sql, values);
    return playlist;
}

export const getPlaylists = async () => {
    const sql = `
    select * from playlists
    `;
    const {rows: playlists} = await db.query(sql);
    return playlists;
}

export const getPlaylistbyId = async (id) => {
    const sql = `
    select * from playlists
    where id = $1
    `;
    const values = [id];
    const {rows: [playlist]} = await db.query(sql, values);
    return playlist;
}

export const getTracksByPlaylistId = async (playlist_id) => {
    const sql = `
    select t.*
    from tracks t
    join playlist_tracks pt on t.id = pt.track_id
    where pt.playlist_id = $1
    `;
    const values = [playlist_id];
    const {rows: tracks} = await db.query(sql, values);
    return tracks;
}

export const createTrackInPlaylistById = async (playlist_id, track_id) => {
    const sql = `
    insert into playlist_tracks (playlist_id, track_id)
    values ($1, $2)
    returning *
    `;
    const values = [playlist_id, track_id];
    const {rows: [playlist_track]} = await db.query(sql, values);
    return playlist_track;
}  