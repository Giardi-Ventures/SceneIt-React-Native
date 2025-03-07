import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TestScreen} from "../screens/test-screen.tsx";
import {BottomStack} from "./bottom-stack.tsx";
import {EntryStack} from "./entry-stack.tsx";
import {MovieScreen} from "../screens/media/movie/movie-screen.tsx";

const Stack = createNativeStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} id={undefined}>
      <Stack.Screen name="Main" component={BottomStack} />
      <Stack.Screen name="EntryLayout" component={EntryStack} />
      <Stack.Screen name="Movie" component={MovieScreen} />
    </Stack.Navigator>
  );
}
