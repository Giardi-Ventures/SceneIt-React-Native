import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LandingScreen} from "../screens/entry/landing-screen.tsx";
import {LoginScreen} from "../screens/entry/login-screen.tsx";

const Stack = createNativeStackNavigator();

export function EntryStack() {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}
