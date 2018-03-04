import React, { KeyboardEvent } from "react";
import debounce from "just-debounce";
import SongList from "../components/SongList";
import Container from "../common/Container";
import styled from "styled-components";
import Input from "../common/forms/Input";
import Field from "../common/forms/Field";
import Label from "../common/forms/Label";
import { InitialProps } from "../server";
import * as History from "history";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { BarLoader } from "react-css-loaders";
interface State {
  artist: string;
}

class CreateSetList extends React.Component<RouteComponentProps<any>, State> {
  public state = { artist: "" };

  public setArtist: (artist: string) => void = debounce(
    (artist: string) => this.setState({ artist }),
    600
  );

  public handleArtist = (event: KeyboardEvent<HTMLInputElement>) => {
    const artist = event.currentTarget.value;
    if (event.key === "Enter") {
      this.props.history.push(`/setlist/make/${artist}`);
    }
  };

  public render() {
    const { artist } = this.state;

    return (
      <Container>
        <h1>Create a setlist!</h1>
        <p>Build a setlist while you're at a gig.</p>
        <Field>
          <Label htmlFor="artist-name">
            Who's playing? Only one artist at a time supported.
          </Label>
          <Input
            id="artist-name"
            placeholder="e.g. Iron Maiden"
            onKeyPress={this.handleArtist}
            type="text"
          />
        </Field>
      </Container>
    );
  }
}

export default withRouter(CreateSetList);
