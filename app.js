import express from "express";
const app = express();
export default app;

import tracksRouter from "./api/tracks.js";
import playlistRouter from "./api/playlists.js";

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Jukebox API.");
});

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistRouter);
