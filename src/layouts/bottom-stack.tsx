import {TestScreen} from "../screens/test-screen.tsx";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export function BottomStack() {
  return (
    <Tab.Navigator id={undefined}>
      <Tab.Screen name="Feed" component={TestScreen} />
      <Tab.Screen name="Movies" component={TestScreen} />
      <Tab.Screen name="Explore" component={TestScreen} />
      <Tab.Screen name="TV" component={TestScreen} />
      <Tab.Screen name="Profile" component={TestScreen} />
    </Tab.Navigator>
  );
}
