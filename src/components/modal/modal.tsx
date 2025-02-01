import ModalBox from "react-native-modalbox";
import {Container} from "../container.tsx";
import {Text} from "../text/text.tsx";
import {ModalProps} from "../../layouts/containers/modal-container.tsx";
import {Row} from "../row.tsx";
import {fetchComparisons, Media, rateMedia} from "@Giardi-Ventures/SceneIt-Core";
import {useState} from "react";

export type InputProps = ModalProps & {
  media: Media;
};

export function InputModal({media, onClose}: InputProps) {
  const [comparisons, setComparisons] = useState<any[]>(null);
  const [score, setScore] = useState<"disliked" | "liked" | "loved">(null);

  const rate = async (score) => {
    setScore(score);

    const {data, error} = await fetchComparisons({
      mediaId: "mov_" + media.id,
      genres: media.genres,
      rating: "disliked",
    });

    if (error === null) {
      setComparisons(data);
    } else {
      console.log(error);
    }
  };

  const submitScores = async () => {
    console.log("Payload", {
      mediaId: media.id,
      logo: media.poster,
      title: media.name,
      rating: score,
      genres: media.genres,
      comparisons: comparisons.map((item) => {
        return {
          rating: item.rating,
          mediaId: item.mediaId,
          ratingId: item.id,
        };
      }),
    });

    const {data, error} = await rateMedia({
      mediaId: media.id,
      logo: media.poster,
      title: media.name,
      rating: score,
      genres: media.genres,
      comparisons: comparisons.map((item) => {
        return {
          rating: item.rating,
          mediaId: item.mediaId,
          ratingId: item.id,
        };
      }),
    });

    if (error === null) {
      console.log("WE DID IT", data);
    } else {
      console.log(error);
    }
  };

  console.log("Daddy", comparisons, score);

  return (
    // @ts-ignore
    <ModalBox
      swipeToClose
      onClosed={onClose}
      backdropOpacity={0.5}
      style={{height: 212, borderTopLeftRadius: 12, borderTopRightRadius: 12}}
      animationDuration={0}
      backdropPressToClose
      position="bottom"
      isOpen={true}
    >
      <Container>
        <Row>
          <Container onPress={() => rate("disliked")}>
            <Text>Disliked It</Text>
          </Container>

          <Container onPress={() => rate("liked")}>
            <Text>Liked It</Text>
          </Container>

          <Container onPress={() => rate("loved")}>
            <Text>Loved It</Text>
          </Container>
        </Row>
      </Container>

      {comparisons?.map((item) => {
        return (
          <Row>
            <Text>{item.title}: </Text>

            <Container onPress={() => (item.rating = "better")}>
              <Text>Better</Text>
            </Container>
            <Container onPress={() => (item.rating = "worse")}>
              <Text>Worse</Text>
            </Container>
            <Container onPress={() => (item.rating = "same")}>
              <Text>Equal</Text>
            </Container>
          </Row>
        );
      })}

      {comparisons !== null && (
        <Container onPress={() => submitScores()}>
          <Text>Submit</Text>
        </Container>
      )}
    </ModalBox>
  );
}
