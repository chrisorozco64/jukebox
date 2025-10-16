import db from "../db/client.js";

export const createPlaylist_tracks = async (playlist_id, track_id) => {
    const sql = `
    insert into playlist_tracks (playlist_id, track_id)
    values ($1, $2)
    returning *
    `;
    const values = [playlist_id, track_id];
    const {rows: [playlist_tracks]} = await db.query(sql, values);
    return playlist_tracks;
}