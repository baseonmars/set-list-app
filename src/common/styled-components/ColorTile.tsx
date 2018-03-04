import React from "react";
import styled, { StyledComponent } from "./index";
import { P } from "../../common";

interface Props extends StyledComponent {
  color: string;
  background: string;
}

const ColorTile: React.SFC<Props> = props => (
  <div className={props.className}>
    <P>color: {props.color}</P>
    <P>background: {props.background}</P>
  </div>
);

const StyledColorTile = styled(ColorTile)`
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  color: ${props => props.theme[props.color]};
  background: ${props => props.theme[props.background]};
`;

export default StyledColorTile;
