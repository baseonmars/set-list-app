import React, { Component } from "react";
import styled, { StyledComponent } from "../common/styled-components";
import { Button } from "../common";
import { Track } from "../../typings/entities";

interface Props extends StyledComponent {
  track: Track;
  onRemove: () => void;
  position: number;
}

class SetListItem extends Component<Props> {
  public render() {
    const { className, track, onRemove, position } = this.props;
    return (
      <div className={className}>
        <div>
          <span>{position}.</span>
          {track.name}
        </div>
        <Button type="button" onClick={onRemove}>
          Remove
        </Button>
      </div>
    );
  }
}

const StyledSetListItem = styled(SetListItem)`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.dividerColor};
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0;
  font-size: 24px;

  & span {
    margin-right: 8px;
    font-family: serif;
    font-weight: bold;
    font-size: 1.2em;
  }
`;

export default StyledSetListItem;
