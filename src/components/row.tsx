import React, {type ReactNode} from "react";
import {Container, ContainerProps} from "./container";
import {constructPropertyMapper} from "../util/property-utils.ts";

export type RowProps = ContainerProps & {
  children: ReactNode;

  items?: "start" | "end" | "center" | "stretch" | "baseline";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
};

const VALUE_ASSIGNMENTS = {
  start: "flex-start",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

const MAPPED_ASSIGNMENTS = {
  items: "alignItems",
  justify: "justifyContent",
};

const mapProps = constructPropertyMapper(MAPPED_ASSIGNMENTS);

export function Row({...containerProps}: RowProps) {
  const rowStyle = mapProps(containerProps, {flexDirection: "row"});

  for (let key of Object.keys(rowStyle)) {
    if (rowStyle[key] in VALUE_ASSIGNMENTS) {
      rowStyle[key] = VALUE_ASSIGNMENTS[rowStyle[key]];
    }
  }

  return <Container style={rowStyle} {...containerProps}></Container>;
}
