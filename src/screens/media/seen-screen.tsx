import {Dimensions, FlatList, Image} from "react-native";
import {Container} from "../../components/container.tsx";
import {Text} from "../../components/text/text.tsx";
import {Row} from "../../components/row.tsx";
import {useEffect, useMemo, useState} from "react";
import {fetchRatings, fetchViewings, Rating, RatingStore, Viewing, ViewingStore} from "@Giardi-Ventures/SceneIt-Core";
import moment from "moment/moment";
import {useNavigation} from "@react-navigation/native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {StackTab} from "../../components/tab/stack-tab.tsx";
import {Tab} from "../../components/tab/common/tab.tsx";
import {useSelector} from "react-redux";
import {MediaCard} from "../../features/media-card.tsx";
import {MediaList} from "../../features/media-list.tsx";

export function SeenScreen() {
  const {navigate} = useNavigation<any>();
  const {data} = useSelector(RatingStore);

  useEffect(() => {
    fetchRatings();
  }, []);

  const movies = useMemo(() => {
    return data.filter((item) => item.media.type === "movie").map((item) => item.media);
  }, [data]);

  const tv = useMemo(() => {
    return data.filter((item) => item.media.type === "tv").map((item) => item.media);
  }, [data]);

  console.log("Seen", data);

  return (
    <Container flex>
      <StackTab>
        <Tab id="movier" label="Movies">
          <MediaList data={movies} />
        </Tab>

        <Tab id="tv" label="Tv">
          <MediaList data={tv} />
        </Tab>

        <Tab id="other" label="Other">
          <MediaList data={tv} />
        </Tab>
      </StackTab>
    </Container>
  );
}
