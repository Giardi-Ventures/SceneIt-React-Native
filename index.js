/**
 * @format
 */

import {AppRegistry, LogBox} from "react-native";
import {name as appName} from "./app.json";
import {Index} from "./src";

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(["Warning: Formik context is undefined"]);

const originalWarn = console.warn;
console.warn = (message, ...args) => {
  if (!["Warning: Formik context is undefined"].some(warning => message.includes(warning))) {
    originalWarn(message, ...args);
  }
};


AppRegistry.registerComponent(appName, () => Index);
