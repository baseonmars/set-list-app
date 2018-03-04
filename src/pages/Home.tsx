import React, { Component, KeyboardEvent, SyntheticEvent } from "react";
import logo from "./react.svg";
import { Link } from "react-router-dom";
import { InitialProps } from "../server";
import Container from "../common/Container";
import {
  Button,
  ButtonPanel,
  Field,
  Label,
  Input,
  Heading,
  P,
  Loader
} from "../common/";
import { History } from "history";

interface Props {
  history: History;
}

interface State {
  artist: string;
}

class Home extends Component<Props, State> {
  public static async getInitialProps({ history }: InitialProps) {
    return { history };
  }

  public state = {
    artist: ""
  };

  public handleStartSetList = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!this.state.artist) {
      return;
    }
    this.props.history.push(`/setlist/make/${this.state.artist}`);
  };

  public handleUpdateArtist = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ artist: event.currentTarget.value });
  };

  public render() {
    return (
      <Container>
        <Heading>
          SetLists is an app for keeping track of the songs played whilst you're
          at a gig.
        </Heading>
        <P>
          Start by entering the artist's name. You can only pick one artist for
          now.
        </P>
        <form onSubmit={this.handleStartSetList}>
          <Field>
            <Label htmlFor="artist">Artist name</Label>
            <Input
              id="artist"
              placeholder="e.g. Underworld"
              onChange={this.handleUpdateArtist}
            />
          </Field>
          <ButtonPanel>
            <Button type="submit">Select Artist</Button>
          </ButtonPanel>
        </form>
      </Container>
    );
  }
}

export default Home;
