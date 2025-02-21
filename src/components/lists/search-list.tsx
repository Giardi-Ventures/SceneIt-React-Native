import {useIsFocused} from "@react-navigation/native";
import {List, ListProps} from "./list.tsx";
import {useInfiniteList} from "@Giardi-Ventures/SceneIt-Core";
import {ListRequestParams} from "../../../.yalc/@Giardi-Ventures/SceneIt-Core/src";
import {useEffect, useState} from "react";
import {Text} from "../text/text.tsx";

export type SearchListProps<G> = Omit<ListProps<G>, "data"> & {
  params: ListRequestParams<G>;
  search: string;
};

export function SearchList<G = any>(props: SearchListProps<G>) {
  const [typingTimeout, setTypingTimeout] = useState<any>(null);
  const {search, ...extraProps} = props;
  const isFocused = useIsFocused();

  const {isLoading, error, isRefreshing, data, hasMore, loadMore, dispatch} = useInfiniteList<any, any[]>({
    url: "media/search",
    method: "POST",
  });

  useEffect(() => {
    if (isFocused && search.length > 0) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      setTypingTimeout(
        setTimeout(() => {
          dispatch({search});
        }, 750),
      );
    }
  }, [isFocused, search]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return <List data={data} {...extraProps} />;
}
