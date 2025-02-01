import "react-native-gesture-handler";

import {NavigationContainer} from "@react-navigation/native";
import {RootStack} from "./layouts/root-stack.tsx";
import {reduxPersist, reduxStore} from "./redux";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {setupCore} from "@Giardi-Ventures/SceneIt-Core";
import {LogBox} from "react-native";
import {ModalContainer} from "./layouts/containers/modal-container.tsx";

setupCore(reduxStore);

export function Index() {
  return (
    <NavigationContainer>
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={reduxPersist}>
          <ModalContainer>
            <RootStack />
          </ModalContainer>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
