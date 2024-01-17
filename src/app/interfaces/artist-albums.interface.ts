export interface SpotiResult {
  href:     string;
  items:    Item[];
  limit:    number;
  next:     string;
  offset:   number;
  previous: null;
  total:    number;
}

export interface Item {
  album_group:            AlbumGroup;
  album_type:             AlbumGroup;
  artists:                Artist[];
  available_markets:      string[];
  external_urls:          ExternalUrls;
  href:                   string;
  id:                     string;
  images:                 Image[];
  name:                   string;
  release_date:           Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks:           number;
  type:                   AlbumGroup;
  uri:                    string;
}

export enum AlbumGroup {
  Album = "album",
  Single = "single",
}

export interface Artist {
  external_urls: ExternalUrls;
  href:          string;
  id:            ID;
  name:          Name;
  type:          Type;
  uri:           URI;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ID {
  The6EUKZXaKkcviH0Ku9W2N3V = "6eUKZXaKkcviH0Ku9w2n3V",
  The718COspgdWOnwOFPJHRZHS = "718COspgdWOnwOFpJHRZHS",
  The7F5Zgnp2SPUuuzKplmRkt7 = "7f5Zgnp2spUuuzKplmRkt7",
}

export enum Name {
  EdSheeran = "Ed Sheeran",
  LostFrequencies = "Lost Frequencies",
  LukeCombs = "Luke Combs",
}

export enum Type {
  Artist = "artist",
}

export enum URI {
  SpotifyArtist6EUKZXaKkcviH0Ku9W2N3V = "spotify:artist:6eUKZXaKkcviH0Ku9w2n3V",
  SpotifyArtist718COspgdWOnwOFPJHRZHS = "spotify:artist:718COspgdWOnwOFpJHRZHS",
  SpotifyArtist7F5Zgnp2SPUuuzKplmRkt7 = "spotify:artist:7f5Zgnp2spUuuzKplmRkt7",
}

export interface Image {
  height: number;
  url:    string;
  width:  number;
}

export enum ReleaseDatePrecision {
  Day = "day",
}
