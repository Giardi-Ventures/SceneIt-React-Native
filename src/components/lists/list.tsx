import {FlatList} from "react-native";
import {Container} from "../container.tsx";
import {ReactElement, useMemo} from "react";
import {useChild} from "@Giardi-Ventures/SceneIt-Core";
import {ListItem} from "./components/list-item.tsx";

export type ListItemFuncProps<G> = {
  index: number;
  item: G;
};

export type ListProps<G> = {
  data: G[];

  onDrag?: boolean;
  draggable?: boolean;

  children: ReactElement | ReactElement[] | ((props: ListItemFuncProps<G>) => ReactElement);
};

export function List<G = any>(props: ListProps<G>) {
  const {data, children} = props;

  const childListItem = useChild(children as ReactElement, ListItem);
  const renderFunction = useMemo(() => {
    if (typeof children === "function") {
      return children;
    }

    if (childListItem) {
      return childListItem.props.children;
    }

    return null;
  }, [children]);

  if (renderFunction === null) {
    throw new Error("List can't render");
  }

  // I WANT TO GET THE CONTAINER STYLE SO I CAN PUT INTO contentContainerStyle

  return (
    <FlatList
      data={data ?? []}
      ItemSeparatorComponent={() => <Container height={12} />}
      contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 10}}
      renderItem={({item, index}) => renderFunction({item, index})}
    />
  );
}

List.Item = ListItem;
