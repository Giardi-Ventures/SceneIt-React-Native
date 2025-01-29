import {TestScreen} from "../screens/test-screen.tsx";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ExploreScreen} from "../screens/explore/explore-screen.tsx";
import {FeedScreen} from "../screens/feed/feed-screen.tsx";

const Tab = createBottomTabNavigator();

export function BottomStack() {
  return (
    <Tab.Navigator id={undefined}>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Movies" component={TestScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="TV" component={TestScreen} />
      <Tab.Screen name="Profile" component={TestScreen} />
    </Tab.Navigator>
  );
}
