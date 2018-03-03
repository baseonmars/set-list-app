import {
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType
} from "graphql";
import { stringify as toQueryString } from "query-string";
import get from "lodash/get";
import fetch from "isomorphic-fetch";
import config from "config";

const lastFmAPIKey = config.get("lastfm.apiKey");
const baseURL = config.get("lastfm.endpoint");

const fetchResponse = (method: string, args = {}) => {
  const options = {
    api_key: lastFmAPIKey,
    format: "json",
    method,
    ...args
  };
  const url = `${baseURL}?${toQueryString(options)}`;
  // console.info(`Fetching ${url}`);
  return fetch(url).then(res => res.json());
};

const fetchArtistTopTracks = (artist: string) =>
  fetchResponse("artist.getTopTracks", { artist }).then(
    json => json.toptracks.track
  );

const fetchTrackInfo = (artist: string, track: string) =>
  fetchResponse("track.getInfo", { artist, track }).then(json => json.track);

const fetchArtistInfo = (artist: string) =>
  fetchResponse("artist.getInfo", { artist }).then(json => json.artist);

const ImageType = new GraphQLObjectType({
  name: "URL",
  description: "URL for an image at a given size",
  fields: () => ({
    url: { type: GraphQLString, resolve: url => url["#text"] },
    size: { type: GraphQLString }
  })
});

const ArtistType: GraphQLObjectType = new GraphQLObjectType({
  name: "Artist",
  description: "An Artist",
  fields: () => ({
    name: { type: GraphQLString },
    mbid: { type: GraphQLString },
    url: { type: GraphQLString },
    id: { type: GraphQLString, resolve: artist => artist.url },
    image: { type: new GraphQLList(ImageType) },
    listeners: {
      type: GraphQLInt,
      resolve: artist => get(artist, "stats.listeners")
    },
    plays: { type: GraphQLInt, resolve: artist => get(artist, "stats.plays") },
    tags: {
      type: new GraphQLList(TagType),
      resolve: artist => get(artist, "tags.tag")
    },
    bio: { type: ArticleType },
    similar: {
      type: new GraphQLList(ArtistType),
      resolve: artist =>
        artist.similar.artist.map((a: { name: string }) =>
          fetchArtistInfo(a.name)
        )
    }
  })
});

const AlbumType = new GraphQLObjectType({
  name: "Album",
  description: "An Album",
  fields: () => ({
    id: { type: GraphQLString, resolve: album => album.url },
    artist: {
      type: GraphQLString,
      description: "Name of the Artist the track is performed by."
    },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
    image: { type: new GraphQLList(ImageType) }
  })
});

const TagType = new GraphQLObjectType({
  name: "Tag",
  description: "A tag used to describe something a track, album or artist",
  fields: () => ({
    id: { type: GraphQLString, resolve: tag => tag.url },
    name: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

const ArticleType = new GraphQLObjectType({
  name: "WikiEntry",
  description: "A wiki entry describing the track",
  fields: () => ({
    published: {
      type: GraphQLInt,
      desciption: "Date of last update, represented in Linux Time (UTC)",
      resolve: wiki => Date.parse(wiki.published) / 1000
    },
    summary: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    }
  })
});

const TrackType = new GraphQLObjectType({
  name: "Track",
  description: "A Track",
  fields: () => ({
    name: { type: GraphQLString },
    mbid: { type: GraphQLString },
    plays: { type: GraphQLInt, resolve: track => track.playcount },
    listeners: { type: GraphQLInt },
    id: { type: GraphQLString, resolve: track => track.url },
    url: { type: GraphQLString },
    image: { type: new GraphQLList(ImageType) },
    trackId: { type: GraphQLString, resolve: track => track.id },
    duration: { type: GraphQLInt },
    artist: { type: ArtistType },
    album: { type: AlbumType },
    tags: {
      type: new GraphQLList(TagType),
      resolve: track => get(track, "toptags.tag")
    },
    wiki: { type: ArticleType }
  })
});

const QueryType = new GraphQLObjectType({
  name: "query",
  description: "Last.fm API Querys",
  fields: () => ({
    track: {
      type: TrackType,
      args: {
        artist: {
          type: GraphQLString,
          description: "Name of the artist that this track is by."
        },
        track: { type: GraphQLString, description: "Name of the track." }
      },
      resolve: (root, { artist, track }) => fetchTrackInfo(artist, track)
    },
    artist: {
      type: ArtistType,
      args: {
        artist: { type: GraphQLString, description: "Name of the artist." }
      },
      resolve: (root, { artist }) => fetchArtistInfo(artist)
    },
    artistTopTracks: {
      type: new GraphQLList(TrackType),
      args: {
        artist: { type: GraphQLString }
      },
      resolve: (root, { artist }) => fetchArtistTopTracks(artist)
    }
  })
});

export default new GraphQLSchema({
  query: QueryType
});
