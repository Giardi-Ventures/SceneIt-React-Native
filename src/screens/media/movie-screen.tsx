import {Container} from "../../components/container.tsx";
import {useNavigation} from "@react-navigation/native";
import {Text} from "../../components/text/text.tsx";

export function MovieScreen() {
  const {goBack} = useNavigation();

  return (
    <Container safe>
      <Container onPress={() => goBack()}>
        <Text>Go Back</Text>
      </Container>
    </Container>
  );
}
