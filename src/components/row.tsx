import React, {type ReactNode} from "react";
import {Container, ContainerProps} from "./container";

export type RowProps = ContainerProps & {
  children: ReactNode;
};

export function Row({children, ...containerProps}: RowProps) {
  return (
    <Container {...containerProps} style={{flexDirection: "row"}}>
      {children}
    </Container>
  );
}
