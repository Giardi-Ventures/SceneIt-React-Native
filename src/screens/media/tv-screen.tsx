import {Container} from "../../components/container.tsx";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Text} from "../../components/text/text.tsx";
import {Row} from "../../components/row.tsx";

export function MovieScreen() {
  const {params} = useRoute();
  const {goBack} = useNavigation();

  return (
    <Container safe>
      <Text>TV</Text>

      <Row>
       <Text>
         Rewatch/Watch
       </Text>

        <Text>
          Trailer
        </Text>

        <Text>
          Rating??
        </Text>
      </Row>

      <Row>
        <Text>Details</Text>
        <Text>Seasons</Text>
        <Text>Threads</Text>
        <Text>History? NOT UNTIL LIKED</Text>
      </Row>

      <Container onPress={() => goBack()}>
        <Text>Go Back</Text>
      </Container>
    </Container>
  );
}
