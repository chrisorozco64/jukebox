import express from "express";
const router = express.Router();
import { getTracks, getTrackbyId } from "../queries/tracks.js";

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id) || !Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).send({ message: "ID must be a positive integer" });
  }
  const tracks = await getTrackbyId(id);
  if (!tracks) {
    return res.status(404).send({ message: "Track not found" });
  }
  res.status(200).send(tracks);
});

export default router;
