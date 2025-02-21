import {Fragment, ReactElement} from "react";
import {ListItemFuncProps} from "../list.tsx";

export type ListItemProps<G> = {
  children: (props: ListItemFuncProps<G>) => ReactElement;
};

export function ListItem<G = any>({}: ListItemProps<G>) {
  return <Fragment />;
}
