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
  padding: 8px 4px;
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${props => props.theme.dividerColor};
  background-color: ${({ theme, ...props }) =>
    props.highlighted ? theme.lightPrimary : "white"};
  font-weight: ${props => (props.selected ? "bold" : "normal")};
`;

export default StyledMenuItem;
