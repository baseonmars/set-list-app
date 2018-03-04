import React from "react";
import styled from "./styled-components";

type Sizes = "s" | "m" | "l";
type Levels = 1 | 2 | 3 | 4 | 5 | 6;

interface Props {
  size?: Sizes;
  level?: Levels;
}

interface DefaultProps extends Props {
  size: Sizes;
  level: Levels;
}

const sizes = {
  s: "16px",
  m: "24px",
  l: "36px"
};

const Heading: React.SFC<Props> = props => {
  const { level } = props as DefaultProps;

  const H = styled[`h${level}`]`
    font-size: ${(p: DefaultProps) => sizes[p.size]};
  `;

  return <H>{props.children}</H>;
};

Heading.defaultProps = {
  size: "l",
  level: 1
};

export default Heading;
