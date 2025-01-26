import {SafeAreaView, Text} from "react-native";
import {TextInput} from "./components/elements/inputs/text-input.tsx";
import {Button} from "./components/buttons/button.tsx";
import {FormButton} from "./components/form/buttons/form-button.tsx";
import {Form} from "./components/form/form.tsx";
import z from "zod";

export function Index() {
  return (
    <SafeAreaView>
      <Text>Hi</Text>

      <Form values={{dog: ""}} schema={z.object({dog: z.string().min(1)})} onSubmit={(values) => {
        console.log("Values", values);
      }}>
        <TextInput placeholder="Dogs" name="dog" />

        <FormButton label="Dogs" />
      </Form>
    </SafeAreaView>
  );
}
