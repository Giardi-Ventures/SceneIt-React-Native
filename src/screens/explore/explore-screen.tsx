import {Container} from "../../components/container.tsx";
import {Text} from "../../components/text/text.tsx";
import {Row} from "../../components/row.tsx";
import {TextInput} from "../../components/elements/inputs/text-input.tsx";
import {useState} from "react";
import {
  globalStore,
  Media,
  useInfiniteList,
  viewMedia,
  updateGlobalState,
  upsertGlobalStateArray,
  ViewingStore,
  useRequest,
  fetchViewings,
  addListItem,
  addToWatchList,
} from "@Giardi-Ventures/SceneIt-Core";
import {Dimensions, FlatList, Image} from "react-native";
import {useModal} from "../../layouts/containers/modal-container.tsx";
import {InputModal} from "../../components/modal/modal.tsx";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useSelector} from "react-redux";
import DraggableFlatList, {RenderItemParams, ScaleDecorator} from "react-native-draggable-flatlist";
import {Tab} from "../../components/tab/tab.tsx";
import {StackTab} from "../../components/tab/stack-tab.tsx";

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
        <Tab id="watched" label="Watch Later">
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
              const media = item;

              return (
                <Container
                  overflow="hidden"
                  background="white"
                  borderRadius={12}
                  onLongPress={drag}
                  // onPress={() => showModal(InputModal, {media: item})}
                >
                  <Container
                    onPress={async () => console.log(await addToWatchList(media.unique))}
                    background="rgba(255, 255, 255, 0.9)"
                    p={10}
                    position="absolute"
                    left={10}
                    top={10}
                    index={100}
                    borderRadius={12}
                  >
                    <FontAwesomeIcon icon="bookmark" />
                  </Container>

                  <Container
                    onPress={async () => console.log(await viewMedia({mediaUnique: media.unique}))}
                    background="rgba(255, 255, 255, 0.9)"
                    p={10}
                    position="absolute"
                    right={10}
                    top={10}
                    index={100}
                    borderRadius={12}
                  >
                    <FontAwesomeIcon icon="check" />
                  </Container>

                  <Image
                    width={Dimensions.get("window").width - 20}
                    height={150}
                    source={{uri: "https://image.tmdb.org/t/p/original" + item.backdrop}}
                  />

                  <Container p={10}>
                    <Text size={16} semiBold>
                      {item.name} ({moment(media.release).format("YYYY")})
                    </Text>

                    <Text mt={4}>{media.genres.map((item) => item.name).join(", ")}</Text>
                  </Container>
                </Container>
              );
            }}
          />
        </Tab>

        <Tab id="movie" label="Movie">
          <Text>Hi</Text>
        </Tab>

        <Tab id="tv" label="TV">
          <Text>Hi</Text>
        </Tab>
      </StackTab>
    </Container>
  );
}
