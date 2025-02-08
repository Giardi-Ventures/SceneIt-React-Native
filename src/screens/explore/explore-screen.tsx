import {Container} from "../../components/container.tsx";
import {Text} from "../../components/text/text.tsx";
import {Row} from "../../components/row.tsx";
import {TextInput} from "../../components/elements/inputs/text-input.tsx";
import {useState} from "react";
import {Media, useInfiniteList, viewMedia} from "@Giardi-Ventures/SceneIt-Core";
import {Dimensions, FlatList, Image} from "react-native";
import {useModal} from "../../layouts/containers/modal-container.tsx";
import {InputModal} from "../../components/modal/modal.tsx";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

export function ExploreScreen() {
  const [typingTimeout, setTypingTimeout] = useState<number>(null);
  const [search, setSearch] = useState<string>("");
  const {showModal} = useModal();

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

      <Row background="white" justify="evenly">
        <Container p={16}>
          <Text>All Media</Text>
        </Container>

        <Container p={16}>
          <Text>Movies</Text>
        </Container>

        <Container p={16}>
          <Text>Television</Text>
        </Container>

        <Container p={16}>
          <Text>People</Text>
        </Container>
      </Row>

      <FlatList
        data={data}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasMore) {
            loadMore();
          }
        }}
        contentContainerStyle={{paddingHorizontal: 10, paddingTop: 10}}
        ItemSeparatorComponent={() => <Container height={10} />}
        renderItem={({item}) => {
          const media: Media = item;

          return (
            <Container
              overflow="hidden"
              background="white"
              borderRadius={12}
              onPress={() => showModal(InputModal, {media: item})}
            >
              <Container
                onPress={() => {}}
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
    </Container>
  );
}
