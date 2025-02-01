import {Container} from "../../components/container.tsx";
import {Text} from "../../components/text/text.tsx";
import {Row} from "../../components/row.tsx";
import {TextInput} from "../../components/elements/inputs/text-input.tsx";
import {useState} from "react";
import {useInfiniteList} from "@Giardi-Ventures/SceneIt-Core";
import {FlatList, Image} from "react-native";
import {useModal} from "../../layouts/containers/modal-container.tsx";
import {InputModal} from "../../components/modal/modal.tsx";

export function ExploreScreen() {
  const [typingTimeout, setTypingTimeout] = useState<number>(null);
  const [search, setSearch] = useState<string>("");
  const {showModal} = useModal();

  const {isLoading, isRefreshing, data, hasMore, loadMore, dispatch} = useInfiniteList<any, any[]>({
    url: "test",
    method: "POST",
  });

  return (
    <Container safe>
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

      <Row>
        <Text>All Media</Text>
        <Text>Movies</Text>
        <Text>TV</Text>
        <Text>People</Text>
      </Row>

      <FlatList
        data={data}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasMore) {
            loadMore();
          }
        }}
        renderItem={({item}) => {
          return (
            <Container onPress={() => showModal(InputModal, {media: item})}>
              <Text>
                {item.name} - {item.type}
              </Text>
              <Image width={100} height={100} source={{uri: "https://image.tmdb.org/t/p/original" + item.backdrop}} />
            </Container>
          );
        }}
      />
    </Container>
  );
}
