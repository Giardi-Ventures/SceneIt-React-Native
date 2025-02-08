import {TestScreen} from "../screens/test-screen.tsx";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ExploreScreen} from "../screens/explore/explore-screen.tsx";
import {FeedScreen} from "../screens/feed/feed-screen.tsx";
import {MediaScreen} from "../screens/media/media-screen.tsx";

const Tab = createBottomTabNavigator();

export function BottomStack() {
  return (
    <Tab.Navigator id={undefined}>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Movies" component={MediaScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="TV" component={MediaScreen} />
      <Tab.Screen name="Profile" component={TestScreen} />
    </Tab.Navigator>
  );
}
