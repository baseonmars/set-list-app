import React, { Component } from "react";
import logo from "./react.svg";
import { Link } from "react-router-dom";
import { InitialProps } from "../server";
import Container from "../common/Container";
import { Heading, P } from "../common/";

class Home extends Component {
  public static async getInitialProps({
    req,
    res,
    match,
    history,
    location,
    ...ctx
  }: InitialProps) {
    return { whatever: "stuff" };
  }

  public render() {
    return (
      <Container>
        <Heading>Set Lists is a set list note taking app.</Heading>
        <P>
          Start by entering the artist's name. You can only pick one artist at a
          time right now.
        </P>
      </Container>
    );
  }
}

export default Home;
