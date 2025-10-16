-- TODO

drop table if exists playlist_tracks;
drop table if exists playlists;
drop table if exists tracks;

create table playlists (
    id serial primary key, 
    name text not null,
    description text not null
);

create table tracks (
    id serial primary key,
    name text null,
    duration_ms integer not null
);

create table playlist_tracks (
    id serial primary key,
    playlist_id integer not null references playlists(id) on delete cascade,
    track_id integer not null references tracks(id) on delete cascade,
    unique (playlist_id, track_id)
);