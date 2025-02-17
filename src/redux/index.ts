import {CommonReducers, CoreReducers} from "@Giardi-Ventures/SceneIt-Core";
import {persistReducer, persistStore} from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist/es/constants";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "user"],
};

const persistedReducer = persistReducer(persistConfig, combineReducers({...CoreReducers, ...CommonReducers}));
export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const reduxPersist = persistStore(reduxStore);
