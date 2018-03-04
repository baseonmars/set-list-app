import React from "react";
import styled, { StyledComponent } from "../common/styled-components";
import Downshift from "downshift";
import { Field, Input } from "../common";
import { Track } from "../../typings/entities";
import TrackSelect from "./TrackSelect";

interface Props extends StyledComponent {
  tracks: Track[];
  onChange: (track: Track) => void;
}

const AddSong: React.SFC<Props> = ({ className, onChange, tracks }) => {
  return (
    <Downshift
      onChange={onChange}
      itemToString={track => track && track.name}
      render={({ getRootProps, ...rest }) => (
        <TrackSelect
          {...rest}
          {...getRootProps({ refKey: "innerRef" })}
          tracks={tracks}
        />
      )}
    />
  );
};

const StyledAddSong = styled(AddSong)``;

export default StyledAddSong;
