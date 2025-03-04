import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import userReducer from "./slices/userSlice";
import publicGistsReducer from "./slices/publicGistsSlice";
import userGistsReducer from "./slices/userGistsSlice";
import starredGistsReducer from "./slices/starredGistsSlice"; // Add this line

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "publicGists", "userGists", "starredGists"], // Add "starredGists" here
};

const rootReducer = combineReducers({
  user: userReducer,
  publicGists: publicGistsReducer,
  userGists: userGistsReducer,
  starredGists: starredGistsReducer, // Add this line
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
