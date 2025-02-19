import ModalBox from "react-native-modalbox";
import {Container} from "../container.tsx";
import {Text} from "../text/text.tsx";
import {ModalProps} from "../../layouts/containers/modal-container.tsx";
import {Row} from "../row.tsx";
import {fetchComparisons, fetchRatings, Media, rateMedia, viewMedia} from "@Giardi-Ventures/SceneIt-Core";
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
      mediaId: media.id,
      mediaType: media.type,
      rating: "disliked",
    });

    if (error === null) {
      setComparisons(data);
    } else {
      console.log(error);
    }
  };

  const submitScores = async () => {
    const {data, error} = await rateMedia({
      mediaType: media.type,
      mediaId: media.id,
      rating: score,
      comparisons: comparisons.map((item) => {
        return {
          mediaId: item.media.id,
          rating: item.rating,
          ratingId: item.id,
        };
      }),
    });

    if (error === null) {
      console.log("WE DID IT", data);
    } else {
      console.log(error);
    }

    await viewMedia({mediaUnique: media.unique});
    await fetchRatings();
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
            <Text>{item.media.name}: </Text>

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
