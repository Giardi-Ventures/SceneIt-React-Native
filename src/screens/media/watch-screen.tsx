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
import {MediaCard} from "../../features/media-card.tsx";

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
              return <MediaCard media={item.media} />;
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
