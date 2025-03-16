import React, {ReactNode} from "react";
import {Container} from "../../container.tsx";

export type TabProps = {
  id: string;
  label: string;
  children: ReactNode | ReactNode[];
};

export function Tab(props: TabProps) {
  const {children} = props;

  return <Container>{children}</Container>;
}
