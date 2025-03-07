import "react-native-gesture-handler";
import "./locales/locales.ts";
import "./injectors";

import {NavigationContainer} from "@react-navigation/native";
import {RootStack} from "./layouts/root-stack.tsx";
import {reduxPersist, reduxStore} from "./redux";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {setupCore} from "@Giardi-Ventures/SceneIt-Core";
import {ModalContainer} from "./layouts/containers/modal-container.tsx";
import {GestureHandlerRootView} from "react-native-gesture-handler";

setupCore(reduxStore);

export function Index() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <Provider store={reduxStore}>
          <PersistGate loading={null} persistor={reduxPersist}>
            <ModalContainer>
              <RootStack />
            </ModalContainer>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
