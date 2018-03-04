import React, { Fragment } from "react";
import { Container, Heading } from "../common";
import styled, { theme } from "../common/styled-components";
import ColorTile from "../common/styled-components/ColorTile";

const Palette = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const ColorPalette: React.SFC<{}> = props => {
  const backgrounds = Object.keys(theme);
  const textColors = [theme.text, theme.lighterText];

  return (
    <Container>
      <Heading>Colour Palettes</Heading>
      <Palette>
        {textColors.map(text =>
          backgrounds.map(background => (
            <ColorTile color={text} background={background} />
          ))
        )}
      </Palette>
    </Container>
  );
};

export default ColorPalette;
