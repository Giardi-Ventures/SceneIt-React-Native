import {Container} from "../../components/container.tsx";
import {Text} from "../../components/text/text.tsx";
import {TextInput} from "../../components/elements/inputs/text-input.tsx";
import {useState} from "react";
import {globalStore, Media, upsertGlobalStateArray, useInfiniteList, ViewingStore} from "@Giardi-Ventures/SceneIt-Core";
import {useModal} from "../../layouts/containers/modal-container.tsx";
import {useSelector} from "react-redux";
import DraggableFlatList, {RenderItemParams} from "react-native-draggable-flatlist";
import {Tab} from "../../components/tab/tab.tsx";
import {StackTab} from "../../components/tab/stack-tab.tsx";
import {MediaCard} from "../../features/media-card.tsx";

export function ExploreScreen() {
  const [typingTimeout, setTypingTimeout] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const {showModal} = useModal();

  const {data: viewingData} = useSelector(ViewingStore);

  const {isLoading, error, isRefreshing, data, hasMore, loadMore, dispatch} = useInfiniteList<any, any[]>({
    url: "test",
    method: "POST",
  });

  console.log("ERROR", error);

  return (
    <Container flex>
      <TextInput
        value={search}
        onChange={setSearch}
        placeholder="Search Movies"
        onValueChange={(test) => {
          if (typingTimeout) {
            clearTimeout(typingTimeout);
          }

          setTypingTimeout(
            setTimeout(() => {
              dispatch({search: test});
            }, 750),
          );
        }}
      />

      <StackTab>
        <Tab id="all" label="All">
          <Text>Tab Two</Text>

          <Container
            onPress={() => {
              globalStore.dispatch(
                upsertGlobalStateArray({
                  newValue: {id: 1, name: "POG"},
                  path: "viewing.data",
                  id: 1,
                }),
              );
            }}
          >
            <Text>Hi</Text>
          </Container>

          {viewingData?.map((item) => {
            return <Text>{item.name}</Text>;
          })}

          <DraggableFlatList
            data={data}
            containerStyle={{flex: 1}}
            keyExtractor={(item) => item.unique}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (hasMore) {
                loadMore();
              }
            }}
            // onDragEnd={({ data }) => setData(data)}
            contentContainerStyle={{paddingHorizontal: 10, paddingTop: 10}}
            ItemSeparatorComponent={() => <Container height={10} />}
            renderItem={({item, drag}: RenderItemParams<Media>) => {
              return <MediaCard media={item} />;
            }}
          />
        </Tab>

        <Tab id="movie" label="Movie">
          <Text>Hi</Text>
        </Tab>

        <Tab id="tv" label="TV">
          <Text>Hi</Text>
        </Tab>

        <Tab id="people" label="People">
          <Text>Hi</Text>
        </Tab>
      </StackTab>
    </Container>
  );
}
