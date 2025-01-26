import {Container} from "../../components/container.tsx";
import {Form} from "../../components/form/form.tsx";
import {TextInput} from "../../components/elements/inputs/text-input.tsx";
import {FormButton} from "../../components/form/buttons/form-button.tsx";
import {LoginParams, LoginParamsType, useLogin} from "@Giardi-Ventures/SceneIt-Core";
import {useNavigation} from "@react-navigation/native";

export function LoginScreen() {
  const {goBack} = useNavigation();
  const {dispatch} = useLogin();

  return (
    <Container safe>
      <Form
        schema={LoginParams}
        values={{username: "", password: ""}}
        onSubmit={async (data: LoginParamsType) => {
          const leRespose = await dispatch(data);

          if (leRespose.error === null) {
            goBack();
          }
        }}
      >
        <TextInput name="username" placeholder="john.cena" />
        <TextInput name="password" placeholder="" />
        <FormButton label="Login" />
      </Form>
    </Container>
  );
}
