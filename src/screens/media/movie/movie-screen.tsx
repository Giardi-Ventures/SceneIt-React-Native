import {Container} from "../../../components/container.tsx";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {Text} from "../../../components/text/text.tsx";
import {fetchMovieMedia, Media, Movie, useFetch} from "@Giardi-Ventures/SceneIt-Core";
import {LoadingContainer} from "../../../components/loading/loading-container.tsx";

import {useSharedValue} from "react-native-reanimated";
import Carousel, {ICarouselInstance, Pagination} from "react-native-reanimated-carousel";
import React from "react";
import {Animated, Dimensions, Image, SafeAreaView, View} from "react-native";
import {Tab} from "../../../components/tab/common/tab.tsx";
import YoutubePlayer from "react-native-youtube-iframe";
import {TabBar} from "../../../components/tab/tab-bar.tsx";
import {TabMenu} from "../../../components/tab/common/tab-menu.tsx";
import {TabBody} from "../../../components/tab/common/tab-body.tsx";
import {Row} from "../../../components/row.tsx";
import {MovieOverviewTab} from "./tabs/movie-overview-tab.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {Center} from "../../../components/center.tsx";
import ScrollView = Animated.ScrollView;

type RouteParams = RouteProp<any> & {
  params: {media: Media};
};

const data2 = [...new Array(6).keys()];
const width = Dimensions.get("window").width;

export function MovieScreen() {
  const {goBack} = useNavigation();
  const {params} = useRoute<RouteParams>();
  const fetchBody = useFetch<Movie>(() => fetchMovieMedia({id: params.media.id}));

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  console.log("Data", fetchBody.data);

  return (
    <LoadingContainer<Movie> fetchBody={fetchBody}>
      <LoadingContainer.Error code="asd">
        <Text>Dog</Text>
      </LoadingContainer.Error>

      {(data) => {
        return (
          <TabBar>
            <SafeAreaView>
              <Row items="center" safe>
                <Container flex={1}>
                  <Container p={12} background="white" onPress={() => goBack()}>
                    <FontAwesomeIcon icon="long-arrow-left" />
                  </Container>
                </Container>

                <Center flex={2}>
                  <Text size={16} semiBold>
                    {data.name}
                  </Text>
                </Center>

                <Container flex={1} />
              </Row>
            </SafeAreaView>

            <ScrollView style={{flex: 1}} stickyHeaderIndices={[2, 3]}>
              <Container>
                <Carousel
                  ref={ref}
                  width={width}
                  height={Math.floor(width * (9 / 16))}
                  data={data2}
                  onProgressChange={progress}
                  renderItem={({index}) => {
                    if (index === 0) {
                      return (
                        <View
                          style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: "center",
                          }}
                        >
                          <YoutubePlayer
                            height={Math.floor(width * (9 / 16))}
                            play={false}
                            videoId={data.media.videos.trailers[0].key}
                          />
                        </View>
                      );
                    }

                    return (
                      <Image
                        width={width}
                        height={Math.floor(width * (9 / 16))}
                        source={{uri: "https://image.tmdb.org/t/p/original" + data.media.images.posters[0].file_path}}
                      />
                    );
                  }}
                />
              </Container>

              <Pagination.Basic
                progress={progress}
                data={data2}
                dotStyle={{backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50}}
                containerStyle={{gap: 5, marginTop: 10}}
                onPress={onPressPagination}
              />

              <Row justify="between">
                <Row>
                  <Center p={12}>
                    <FontAwesomeIcon icon="play" />

                    <Text>Watch It</Text>
                  </Center>
                </Row>

                <Row>
                  <Center p={12}>
                    <FontAwesomeIcon icon="bookmark" />

                    <Text>Watch Later</Text>
                  </Center>

                  <Center p={12}>
                    <FontAwesomeIcon icon="glasses" />

                    <Text>Watched</Text>
                  </Center>
                </Row>
              </Row>

              <TabMenu />
              <TabBody />
            </ScrollView>

            <Tab id="Test33" label="Overview">
              <MovieOverviewTab data={data} />
            </Tab>

            <Tab id="ratings" label="Ratings">
              <Row justify="evenly">
                <Center border={1}>
                  <Text size={22}>5.0</Text>
                  <Text>My Rating:</Text>
                </Center>

                {data.genres.map((item) => {
                  return (
                    <Container>
                      <Text>{item.name}</Text>
                      <Text>5.0</Text>
                    </Container>
                  );
                })}
              </Row>

              <Container p={20}>
                <Text>View My Comparisons:</Text>
              </Container>

              <Text>Global Ratings</Text>

              {data.genres.map((item) => {
                return (
                  <Container>
                    <Text>{item.name}</Text>

                    <Text>Table</Text>
                  </Container>
                );
              })}

              <Text>Stars of Show</Text>

              <Text>Menetioned</Text>

              <Text>Watch Again</Text>

              <Text>Legacy Rating</Text>

              <Text>{data.popularity}</Text>
            </Tab>

            <Tab id="discussion" label="Discussion">
              <MovieOverviewTab data={data} />
            </Tab>

            {/*<Tab id="Test33" label="Live Discussion">*/}
            {/*  <MovieOverviewTab data={data} />*/}
            {/*</Tab>*/}

            <Tab id="viewings" label="Viewings">
              <Text>Hi</Text>
            </Tab>
          </TabBar>
        );
      }}
    </LoadingContainer>
  );
}
