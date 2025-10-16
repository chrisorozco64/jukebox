import express from "express";
const router = express.Router();
import {
  getPlaylists,
  getPlaylistbyId,
  getTracksByPlaylistId,
  createPlaylist,
  createTrackInPlaylistById,
} from "../queries/playlists.js";

router
  .route("/")
  .get(async (req, res) => {
    const playlists = await getPlaylists();
    res.send(playlists);
  })
  .post(async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ message: "Request body is required" });
    }
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .send({ message: "Name and description are required" });
    }
    const playlist = await createPlaylist(name, description);
    res.status(201).send(playlist);
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    if (isNaN(id) || !Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).send({ message: "ID must be a positive integer" });
    }
    const playlist = await getPlaylistbyId(id);
    if (!playlist) {
      return res.status(404).send({ message: "Playlist not found" });
    }
    const tracks = await getTracksByPlaylistId(id);
    playlist.tracks = tracks;
    res.status(200).send(playlist);
  });

router 
  .route("/:id/tracks")
  .get(async (req, res) => {
    const { id } = req.params;
    if (isNaN(id) || !Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).send({ message: "ID must be a positive integer" });
    }
    const playlist = await getPlaylistbyId(id);
    if (!playlist) {
      return res.status(404).send({ message: "Playlist not found" });
    }
    const tracks = await getTracksByPlaylistId(id);
    res.status(200).send(tracks);
  })
  .post(async (req, res) => {
    const { id } = req.params;
    if (isNaN(id) || !Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).send({ message: "ID must be a positive integer" });
    }
    const playlist = await getPlaylistbyId(id);
    if (!playlist) {
      return res.status(404).send({ message: "Playlist not found" });
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ message: "Request body is required" });
    }
const { trackId } = req.body;
if (!trackId || isNaN(trackId) || !Number.isInteger(Number(trackId)) || Number(trackId) <= 0) {
  return res.status(400).send({ message: "trackId is required and must be a positive integer" });
}
try { 
  const playlist_track = await createTrackInPlaylistById(id, trackId);
  res.status(201).send(playlist_track);
} catch (error) {
  if (error.code === '23503') {
    return res.status(400).send({ message: "Track not found" });
  }
  if (error.code === '23505') {
    return res.status(400).send({ message: "Track already exists in playlist" });
  }
  res.status(500).send({ message: "Error adding track to playlist", error: error.message });
  }
});

export default router;
