import {MediaCard} from "./media-card.tsx";
import {Media, useChild} from "@Giardi-Ventures/SceneIt-Core";
import {useIsFocused} from "@react-navigation/native";
import {List} from "../components/lists/list.tsx";

type MediaListProps = {
  data: Media[];
};

export function MediaList(props: MediaListProps) {
  const leta = useIsFocused();
  const {data} = props;

  return (
    <List
      data={data || []}
      // ItemSeparatorComponent={() => <Container height={12} />}
      // contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 10}}
    >
      {({item, index}) => {
        return <MediaCard media={item} />;
      }}
    </List>
  );
}
