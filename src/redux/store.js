import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import thoughtReducer from "./reducers/thoughtReducer";
import tagReducer from "./reducers/tagReducer";
import thoughtCreationReducer from "./reducers/thoughtCreationReducer";
import tagCreationReducer from "./reducers/tagCreationReducer";

const rootReducer = combineReducers({
  thoughtReducer,
  tagReducer,
  tagCreationReducer,
  thoughtCreationReducer,
});

const persistConfig = {
  key: "root",
  blacklist: ["thoughtCreationReducer"],
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
