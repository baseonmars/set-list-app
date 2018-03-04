import React, { Component } from "react";
import styled, { StyledComponent } from "../common/styled-components";
import { Track } from "../../typings/entities";

interface Props extends StyledComponent {
  track: Track;
}

class SetListItem extends Component<Props> {
  public render() {
    const { className, track } = this.props;
    return <div className={className}>{track.name}</div>;
  }
}

const StyledSetListItem = styled(SetListItem)`
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.dividerColor};
`;

export default StyledSetListItem;
