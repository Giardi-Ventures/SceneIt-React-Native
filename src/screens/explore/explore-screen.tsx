import {Container} from "../../components/container.tsx";
import {Text} from "../../components/text/text.tsx";
import {TextInput} from "../../components/elements/inputs/text-input.tsx";
import {useState} from "react";
import {ViewingStore} from "@Giardi-Ventures/SceneIt-Core";
import {useModal} from "../../layouts/containers/modal-container.tsx";
import {useSelector} from "react-redux";
import {Tab} from "../../components/tab/common/tab.tsx";
import {StackTab} from "../../components/tab/stack-tab.tsx";
import {MediaCard} from "../../features/media-card.tsx";
import {SearchList} from "../../components/lists/search-list.tsx";

export function ExploreScreen() {
  const [typingTimeout, setTypingTimeout] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const {showModal} = useModal();

  const {data: viewingData} = useSelector(ViewingStore);

  // const {isLoading, error, isRefreshing, data, hasMore, loadMore, dispatch} = useInfiniteList<any, any[]>({
  //   url: "media/search",
  //   method: "POST",
  // });

  // console.log("ERROR", error);

  return (
    <Container flex>
      <TextInput value={search} onChange={setSearch} placeholder="Search Movies" />

      <StackTab>
        <Tab id="all" label="All">
          <SearchList params={{url: "media/search", method: "POST"}} search={search}>
            {({item}) => {
              return <MediaCard media={item} />;
            }}
          </SearchList>

          {/*<DraggableFlatList*/}
          {/*  data={data}*/}
          {/*  containerStyle={{flex: 1}}*/}
          {/*  keyExtractor={(item) => item.unique}*/}
          {/*  onEndReachedThreshold={0.5}*/}
          {/*  onEndReached={() => {*/}
          {/*    if (hasMore) {*/}
          {/*      loadMore();*/}
          {/*    }*/}
          {/*  }}*/}
          {/*  // onDragEnd={({ data }) => setData(data)}*/}
          {/*  contentContainerStyle={{paddingHorizontal: 10, paddingTop: 10}}*/}
          {/*  ItemSeparatorComponent={() => <Container height={10} />}*/}
          {/*  renderItem={({item, drag}: RenderItemParams<Media>) => {*/}
          {/*    return <MediaCard media={item} />;*/}
          {/*  }}*/}
          {/*/>*/}
        </Tab>

        <Tab id="movie" label="Movie">
          <SearchList params={{url: "media/search", method: "POST"}} search={search}>
            {({item}) => {
              return <MediaCard media={item} />;
            }}
          </SearchList>
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
