import {FlatList} from "react-native";
import {Container} from "../../components/container.tsx";
import {Text} from "../../components/text/text.tsx";
import {ListStore} from "@Giardi-Ventures/SceneIt-Core";
import {useNavigation} from "@react-navigation/native";
import {StackTab} from "../../components/tab/stack-tab.tsx";
import {Tab} from "../../components/tab/common/tab.tsx";
import {useSelector} from "react-redux";
import {MediaCard} from "../../features/media-card.tsx";
import {useTranslation} from "react-i18next";

export function WatchScreen() {
  const {watch} = useSelector(ListStore);
  const {t} = useTranslation();

  console.log("Watch", t("translation:welcome"));

  return (
    <Container flex>
      <Container>
        <Text>Search, Filter, Genres</Text>
      </Container>

      <StackTab>
        <Tab id="movie" label="Movies">
          <Text>{t("translation:welcome")}</Text>
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
