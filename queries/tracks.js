import db from "../db/client.js";

export const createTrack = async (name, duration_ms) => {
    const sql = `
    insert into tracks (name, duration_ms)
    values ($1, $2)
    returning *
    `;
    const values = [name, duration_ms];
    const {rows: [track]} = await db.query(sql, values);
    return track;
}

export const getTracks = async () => {
    const sql = `
    select * from tracks
    `;
    const {rows: tracks} = await db.query(sql);
    return tracks;
}

export const getTrackbyId = async (id) => {
    const sql = `
    select * from tracks
    where id = $1
    `;
    const values = [id];
    const {rows: [track]} = await db.query(sql, values);
    return track;
}