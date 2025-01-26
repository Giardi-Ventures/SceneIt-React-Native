import {apiRequest, useRequest, useUserStore} from "@Giardi-Ventures/SceneIt-Core";
import {Image, SafeAreaView, Text} from "react-native";
import {Form} from "../components/form/form.tsx";
import z from "zod";
import {TextInput} from "../components/elements/inputs/text-input.tsx";
import {FormButton} from "../components/form/buttons/form-button.tsx";
import {Container} from "../components/container.tsx";
import {Button} from "../components/buttons/button.tsx";
import {useNavigation} from "@react-navigation/native";

export function TestScreen() {
  const {navigate} = useNavigation<any>();
  const {account} = useUserStore();

  const {isLoading, error, data, dispatch} = useRequest((body) => {
    return apiRequest({url: "test", method: "POST", body});
  });

  console.log("Dogs", error, isLoading, data);

  return (
    <SafeAreaView>
      <Text>All | Movie | TV </Text>

      <Form
        values={{dog: ""}}
        schema={z.object({dog: z.string().min(1)})}
        onSubmit={async ({dog}) => {
          console.log("Values", dog);

          const data = await dispatch({search: dog});

          console.log("DATA", data);
        }}
      >
        <TextInput placeholder="Dogs" name="dog" />

        <FormButton label="Dogs" />
      </Form>

      {account === null ? (
        <Button label="Login" onPress={() => navigate("EntryLayout")} />
      ) : (
        <Text>{JSON.stringify(account)}</Text>
      )}

      {data?.results?.map((item) => {
        return (
          <Container>
            <Text>{item.media_type}</Text>
            <Image width={100} height={100} source={{uri: "https://image.tmdb.org/t/p/original" + item.poster_path}} />
          </Container>
        );
      })}
    </SafeAreaView>
  );
}
