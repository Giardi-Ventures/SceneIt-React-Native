import {Container} from "../../../components/container.tsx";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {Text} from "../../../components/text/text.tsx";
import {fetchMovieMedia, Media, useFetch} from "@Giardi-Ventures/SceneIt-Core";
import {LoadingContainer} from "../../../components/loading/loading-container.tsx";

import {useSharedValue} from "react-native-reanimated";
import Carousel, {ICarouselInstance, Pagination} from "react-native-reanimated-carousel";
import React from "react";
import {Animated, Dimensions, View} from "react-native";
import ScrollView = Animated.ScrollView;
import {Tab} from "../../../components/tab/common/tab.tsx";
import {StackTab} from "../../../components/tab/stack-tab.tsx";
import YoutubePlayer from "react-native-youtube-iframe";
import {TabBar} from "../../../components/tab/tab-bar.tsx";

type RouteParams = RouteProp<any> & {
  params: {media: Media};
};

const data2 = [...new Array(6).keys()];
const width = Dimensions.get("window").width;

export function MovieScreen() {
  const {goBack} = useNavigation();
  const {params} = useRoute<RouteParams>();
  const fetchBody = useFetch<Media>(() => fetchMovieMedia({id: params.media.id}));

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
    <LoadingContainer fetchBody={fetchBody}>
      <LoadingContainer.Error code="asd">
        <Text>Dog</Text>
      </LoadingContainer.Error>

      {(data) => {
        return (
          <TabBar>
            <ScrollView stickyHeaderIndices={[1, 2, 3]}>
              <Carousel
                ref={ref}
                width={width}
                height={width / 2}
                data={data2}
                onProgressChange={progress}
                renderItem={({index}) => (
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      justifyContent: "center",
                    }}
                  >
                    <YoutubePlayer height={300} play={true} videoId={"iee2TATGMyI"} />
                  </View>
                )}
              />

              <Pagination.Basic
                progress={progress}
                data={data2}
                dotStyle={{backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50}}
                containerStyle={{gap: 5, marginTop: 10}}
                onPress={onPressPagination}
              />

              <Container background="white" onPress={() => goBack()}>
                <Text>Go Back</Text>
              </Container>

              <Text>Hi</Text>
            </ScrollView>

            <Tab id="Test33" label="Test">
              <Container>
                <Text>{/*We Rendering{data.name} {data.id}*/}</Text>

                <Container>
                  <Text>Images</Text>
                </Container>

                <Container>
                  <Text>Where to Watch</Text>
                </Container>
                <Container>
                  <Text>Where to Watch</Text>
                </Container>
                <Container>
                  <Text>Where to Watch</Text>
                </Container>
                <Container>
                  <Text>Where to Watch</Text>
                </Container>
                <Container>
                  <Text>Where to Watch</Text>
                </Container>
                <Container>
                  <Text>Where to Watch</Text>
                </Container>
                <Container>
                  <Text>Where to Watch</Text>
                </Container>
                <Container>
                  <Text>Joe Biden</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Where to Watch</Text>
                  <Text>Joe Biden</Text>
                </Container>
              </Container>
            </Tab>

            <Tab id="Test333" label="Test">
              <Text>hi Mom</Text>
            </Tab>
          </TabBar>
        );
      }}
    </LoadingContainer>
  );
}
