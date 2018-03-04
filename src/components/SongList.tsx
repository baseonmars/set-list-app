import React, { Component, ReactNode, Fragment } from "react";
import { graphql, QueryProps, ChildProps } from "react-apollo";
import gql from "graphql-tag";
import { Loader } from "../common";
import { Track } from "../../typings/entities";

interface Props {
  artist: string;
  tracks?: Track[];
  loading?: boolean;
  children: (args: { tracks?: Track[]; loading: boolean }) => ReactNode;
}

interface Response {
  artistTopTracks: Track[];
}

interface InputProps extends Props {
  artist: string;
}

type CProps = ChildProps<InputProps, Response>;

interface DefaultProps extends Props {
  loading: boolean;
  tracks: Track[];
}

class SongList extends Component<CProps, {}> {
  public static defaultProps = {
    loading: false,
    tracks: []
  };

  public render() {
    const { children, loading, tracks } = this.props as DefaultProps;
    return <Fragment>{children({ loading, tracks })}</Fragment>;
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
