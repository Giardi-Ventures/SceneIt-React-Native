import {useInfiniteList, useUserStore} from "@Giardi-Ventures/SceneIt-Core";
import {FlatList, Image, SafeAreaView, Text} from "react-native";
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

  const {isLoading, isRefreshing, data, hasMore, loadMore, dispatch} = useInfiniteList<any, any[]>({
    url: "test",
    method: "POST",
  });

  console.log("Dogs", isLoading, isRefreshing, data);

  return (
    <SafeAreaView>
      <Text>All | Movie | TV </Text>

      <Form
        values={{dog: ""}}
        schema={z.object({dog: z.string().min(1)})}
        onSubmit={async ({dog}) => {
          console.log("Values", dog);

          const data = await dispatch({search: dog});

          console.log("DATA", data.cursor);
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

      {hasMore && <Button label="Next" onPress={() => loadMore()} />}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return (
            <Container>
              <Text>
                {item.name} - {item.type}
              </Text>
              <Image width={100} height={100} source={{uri: "https://image.tmdb.org/t/p/original" + item.backdrop}} />
            </Container>
          );
        }}
      />
    </SafeAreaView>
  );
}
