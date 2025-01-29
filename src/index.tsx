import "react-native-gesture-handler";

import {NavigationContainer} from "@react-navigation/native";
import {RootStack} from "./layouts/root-stack.tsx";
import {reduxPersist, reduxStore} from "./redux";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {setupCore} from "@Giardi-Ventures/SceneIt-Core";
import {LogBox} from "react-native";

setupCore(reduxStore);

export function Index() {
  return (
    <NavigationContainer>
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={reduxPersist}>
          <RootStack />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
