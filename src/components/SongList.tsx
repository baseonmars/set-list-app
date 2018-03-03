import React, { Component } from "react";
import { graphql, QueryProps, ChildProps } from "react-apollo";
import gql from "graphql-tag";

interface Track {
  name: string;
}

interface Props {
  artist: string;
  tracks?: Track[];
  loading?: boolean;
}

interface Response {
  artistTopTracks: Track[];
}

interface InputProps extends Props {
  artist: string;
}

type CProps = ChildProps<InputProps, Response>;

class SongList extends Component<CProps, {}> {
  public render() {
    const { loading, tracks } = this.props;
    return !loading && tracks && tracks.length ? (
      <ul>{tracks.map(t => <li key={t.name}>{t.name}</li>)}</ul>
    ) : null;
  }
}

const withTracks = graphql<Response, Props, CProps, InputProps>(
  gql`
    query($artist: String!) {
      artistTopTracks(artist: $artist) {
        name
      }
    }
  `,
  {
    props: ({ data }) => {
      if (!data) {
        return {};
      }
      return {
        tracks: data.artistTopTracks,
        loading: data.loading
      };
    },
    skip: ({ artist }) => !artist,
    options: ({ artist }) => ({
      variables: { artist }
    })
  }
);
export default withTracks(SongList);
