import {Dimensions, FlatList, Image} from "react-native";
import {Container} from "../../components/container.tsx";
import {Text} from "../../components/text/text.tsx";
import {Row} from "../../components/row.tsx";
import {useEffect, useState} from "react";
import {fetchRatings, fetchViewings, Rating} from "@Giardi-Ventures/SceneIt-Core";
import moment from "moment/moment";
import {useNavigation} from "@react-navigation/native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

export function MediaScreen() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const {navigate} = useNavigation<any>();

  useEffect(() => {
    fetchViewings().then(({data, error}) => {
      if (error) {
        return console.log("Error", error);
      }

      console.log(data);

      setRatings(data);
    });
  }, []);

  return (
    <Container flex>
      <Text>Test</Text>

      <Row background="white" justify="evenly">
        <Container p={16}>
          <Text>Watch Later</Text>
        </Container>

        <Container p={16}>
          <Text>Movies</Text>
        </Container>

        <Container p={16}>
          <Text>Custom Lists</Text>
        </Container>
      </Row>

      <FlatList
        data={ratings}
        ItemSeparatorComponent={() => <Container height={12} />}
        contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 10}}
        renderItem={({item, index}: {item: any; index: number}) => {
          return (
            <Container overflow="hidden" background="white" borderRadius={12} onPress={() => navigate("Movie")}>
              {index % 2 === 0 ? (
                <Container
                  onPress={() => {}}
                  background="rgba(255, 255, 255, 0.9)"
                  p={10}
                  position="absolute"
                  right={10}
                  top={10}
                  index={100}
                  borderRadius={12}
                >
                  <Text>{item.displayScore?.toFixed(2)}</Text>
                </Container>
              ) : (
                <>
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
                    <FontAwesomeIcon icon="trash" />
                  </Container>

                  <Container
                    onPress={() => {}}
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
                </>
              )}

              <Image
                width={Dimensions.get("window").width - 20}
                height={150}
                source={{uri: "https://image.tmdb.org/t/p/original" + item.media.logo}}
              />

              <Container p={10}>
                <Text size={16} semiBold>
                  {item.media.title} ({moment(item.media.release).format("YYYY")})
                </Text>

                <Text mt={4}>{item.media.genres.map((item) => item.name).join(", ")}</Text>
              </Container>
            </Container>
          );
        }}
      />
    </Container>
  );
}
