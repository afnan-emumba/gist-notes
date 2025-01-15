import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import userReducer from "./slices/userSlice";
import publicGistsReducer from "./slices/publicGistsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "publicGists"],
};

const rootReducer = combineReducers({
  user: userReducer,
  publicGists: publicGistsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
