import React, { Component, Fragment } from "react";
import { Container, Loader } from "../common";
import { RouteComponentProps } from "react-router";
import SongList from "../components/SongList";
import AddTrack from "../components/AddTrack";
import { Track } from "../../typings/entities";
import styled, { StyledComponent } from "../common/styled-components";
import SetListItem from "../components/SetListItem";

interface Props extends RouteComponentProps<any> {
  artist: string;
}

interface State {
  setList: Track[];
}

class MakeSetList extends Component<Props, State> {
  public state = {
    setList: new Array<Track>()
  };
  public handleAddSong = (track: Track) => {
    this.setState(state => ({
      setList: [...(state.setList || []), track]
    }));
  };

  public render() {
    const { artist } = this.props.match.params;
    const { setList } = this.state;
    return (
      <Container>
        <h1>Start Building your list</h1>
        <SongList artist={artist}>
          {({ loading, tracks }) => {
            return loading && tracks && tracks.length ? (
              <Loader />
            ) : (
              <Fragment>
                {setList.map(track => (
                  <SetListItem key={track.name} track={track} />
                ))}
                <AddTrack tracks={tracks || []} onChange={this.handleAddSong} />
              </Fragment>
            );
          }}
        </SongList>
      </Container>
    );
  }
}

export default MakeSetList;
