import {Container} from "../../components/container.tsx";
import {Button} from "../../components/buttons/button.tsx";
import {useNavigation} from "@react-navigation/native";

export function LandingScreen() {
  const {goBack, navigate} = useNavigation<any>();

  return (
    <Container safe>
      <Container>
        <Button label="Back" onPress={() => goBack()} />
        <Button label="Login" onPress={() => navigate("LoginScreen")} />
        <Button label="Register" />
        <Button label="Google" />
      </Container>
    </Container>
  );
}
