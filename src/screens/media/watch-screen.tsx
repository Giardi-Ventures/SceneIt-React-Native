import {Dimensions, FlatList, Image} from "react-native";
import {Container} from "../../components/container.tsx";
import {Text} from "../../components/text/text.tsx";
import {Row} from "../../components/row.tsx";
import {useEffect, useState} from "react";
import {fetchRatings, fetchViewings, ListStore, Rating, Viewing} from "@Giardi-Ventures/SceneIt-Core";
import moment from "moment/moment";
import {useNavigation} from "@react-navigation/native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {StackTab} from "../../components/tab/stack-tab.tsx";
import {Tab} from "../../components/tab/tab.tsx";
import {useSelector} from "react-redux";

export function WatchScreen() {
  const {navigate} = useNavigation<any>();
  const {watch} = useSelector(ListStore);

  console.log("Watch", watch);

  return (
    <Container flex>
      <StackTab>
        <Tab id="movie" label="Movies">
          <Text>Tab Two</Text>
        </Tab>

        <Tab id="tv" label="TV">
          <FlatList
            data={watch?.items ?? []}
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
        </Tab>

        <Tab id="other" label="Other">
          <Text>Other Sad</Text>
        </Tab>
      </StackTab>
    </Container>
  );
}
