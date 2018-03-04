import React, { Component } from "react";
import Container from "../common/Container";
import { RouteComponentProps } from "react-router";
import SongList from "../components/SongList";

interface Props extends RouteComponentProps<any> {
  artist: string;
}

class MakeSetList extends Component<Props> {
  public render() {
    const { artist } = this.props.match.params;
    return (
      <Container>
        <h1>Start Building your list</h1>
        <SongList artist={artist} />
      </Container>
    );
  }
}

export default MakeSetList;
