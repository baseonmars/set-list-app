import React from "react";
import { Field, Input } from "../common";
import { Track } from "../../typings/entities";
import styled, { StyledComponent } from "../common/styled-components";

interface MenuItem extends StyledComponent {
  track: Track;
  highlighted: boolean;
  selected: boolean;
  itemProps: any;
}
const MenuItem: React.SFC<MenuItem> = ({ track, className, itemProps }) => (
  <div className={className} key={track.name} {...itemProps}>
    {track.name}
  </div>
);

const StyledMenuItem = styled(MenuItem)`
  padding: 8px 0;
  border-bottom: 1px solid ${props => props.theme.dividerColor};
  background-color: ${props => (props.highlighted ? "gray" : "white")};
  font-weight: ${props => (props.selected ? "bold" : "normal")};
`;

export default StyledMenuItem;
