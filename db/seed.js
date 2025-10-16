import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createTrack } from "../queries/tracks.js";
import { createPlaylist } from "../queries/playlists.js";
import { createPlaylist_tracks } from "../queries/playlists_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  const tracks = [];
  for (let i = 0; i < 20; i++) {
    const track = await createTrack(
      faker.music.songName(),
      faker.number.int({ min: 120000, max: 300000 })
    );
    tracks.push(track);
  }

  const playlists = [];
  for (let i = 0; i < 10; i++) {
    const playlist = await createPlaylist(
      faker.lorem.words(3),
      faker.lorem.sentence()
    );
    playlists.push(playlist);
  }

  for (let i = 0; i < 15; i++) {
    const randomPlaylist =
      playlists[faker.number.int({ min: 0, max: playlists.length - 1 })];
    const randomTrack =
      tracks[faker.number.int({ min: 0, max: tracks.length - 1 })];

    try {
      await createPlaylist_tracks(randomPlaylist.id, randomTrack.id);
    } catch (err) {
      i--;
    }
  }
}
