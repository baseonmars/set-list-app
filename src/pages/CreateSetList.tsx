import React, { SyntheticEvent } from "react";
import SongList from "../components/SongList";
import debounce from "just-debounce";

interface State {
  artist: string;
}

class CreateSetList extends React.Component<{}, State> {
  public state = { artist: "Iron Maiden" };

  public setArtist: (artist: string) => void = debounce(
    (artist: string) => this.setState({ artist }),
    600
  );

  public handleArtist = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setArtist(event.currentTarget.value);
  };

  public render() {
    const { artist } = this.state;

    return (
      <div>
        <h1>Create your setlist</h1>
        <label htmlFor="artist-name">Artist Name</label>
        <input
          id="artist-name"
          placeholder="e.g. Iron Maiden"
          onChange={this.handleArtist}
        />
        <SongList artist={artist} />
      </div>
    );
  }
}

export default CreateSetList;
