import {Container} from "../components/container.tsx";
import {
  addToWatchList,
  ListState,
  ListStore,
  Media,
  RatingStore,
  removeFromWatchList,
  ViewingState,
  ViewingStore,
  viewMedia,
} from "@Giardi-Ventures/SceneIt-Core";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {Dimensions, Image} from "react-native";
import {Text} from "../components/text/text.tsx";
import moment from "moment/moment";
import {useCallback, useMemo} from "react";
import {useSelector} from "react-redux";
import {useModal} from "../layouts/containers/modal-container.tsx";
import {InputModal} from "../components/modal/modal.tsx";
import {useNavigation} from "@react-navigation/native";

export type MediaProps = {
  media: Media;
};

export function MediaCard(props: MediaProps) {
  const {data: ratings} = useSelector(RatingStore);
  const {watch}: ListState = useSelector(ListStore);
  const {showModal} = useModal();
  const {navigate} = useNavigation<any>();
  const {media} = props;

  const isViewed = useMemo(() => {
    return ratings.find((item) => {
      return item.media.unique === media.unique;
    });
  }, [watch]);

  const isListed = useMemo(() => {
    return watch.items.find((item) => {
      return item.media.unique === media.unique;
    });
  }, [watch, ratings]);

  const LeftButton = useMemo(() => {
    if (isViewed) {
      return <Container />;
    }

    if (isListed) {
      return (
        <Container
          onPress={async () => console.log(await removeFromWatchList(media.unique))}
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
      );
    }

    return (
      <Container
        onPress={async () => console.log(await addToWatchList(media.unique))}
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
    );
  }, [isViewed, isListed]);

  const RightButton = useMemo(() => {
    if (isViewed) {
      const rate = ratings.find((item) => {
        return item.media.unique === media.unique;
      });

      return (
        <Container
          background="rgba(255, 255, 255, 0.9)"
          p={10}
          position="absolute"
          right={10}
          top={10}
          index={100}
          borderRadius={12}
        >
          <Text medium>{rate?.displayScore ?? "?"}</Text>
        </Container>
      );
    }

    return (
      <Container
        onPress={async () => showModal(InputModal, {media})}
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
    );
  }, [isViewed]);

  return (
    <Container
      overflow="hidden"
      background="white"
      borderRadius={12}
      // onLongPress={drag}
      onPress={() => {
        if (media.type === "movie") {
          return navigate("Movie", {media});
        }
      }}
    >
      {LeftButton}
      {RightButton}

      <Image
        width={Dimensions.get("window").width - 20}
        height={150}
        source={{uri: "https://image.tmdb.org/t/p/original" + media.backdrop}}
      />

      <Container p={10}>
        <Text size={16} semiBold>
          {media.name} ({moment(media.release).format("YYYY")})
        </Text>

        <Text mt={4}>{media.genres.map((item) => item.name).join(", ")}</Text>
      </Container>
    </Container>
  );
}
