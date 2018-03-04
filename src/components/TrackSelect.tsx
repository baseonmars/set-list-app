import React from "react";
import { Field, Input } from "../common";
import { Track } from "../../typings/entities";
import styled, { StyledComponent } from "../common/styled-components";
import TrackSelectMenuItem from "./TrackSelectMenuItem";

interface Props {
  innerRef: string;
  getInputProps: (args: { [key: string]: any }) => { [key: string]: any };
  getItemProps: (args: { item: Track }) => { [key: string]: any };
  isOpen: boolean;
  inputValue: string | null;
  tracks: Track[];
  selectedItem: Track;
  highlightedIndex: number | null;
}

const TrackSelect: React.SFC<Props> = ({
  innerRef,
  getInputProps,
  isOpen,
  getItemProps,
  inputValue,
  tracks,
  selectedItem,
  highlightedIndex
}) => (
  <div ref={innerRef}>
    <Field>
      <Input
        {...getInputProps({ placeholder: `What's playing?`, value: "" })}
      />
      {isOpen ? (
        <div style={{ border: "1px solid #ccc" }}>
          {tracks
            .filter(
              i =>
                !inputValue ||
                i.name.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((track, index) => (
              <TrackSelectMenuItem
                key={track.name}
                track={track}
                selected={selectedItem === track}
                highlighted={highlightedIndex === index}
                itemProps={getItemProps({ item: track })}
              />
            ))}
        </div>
      ) : null}
    </Field>
  </div>
);

export default TrackSelect;
