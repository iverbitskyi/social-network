import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import themeReducer from "./theme/theme.slice";
import authReducer from "./auth/auth.slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist/es/constants";

const persistConfig = {
	key: "root",
	storage,
	version: 1,
	whitelist: ["auth"],
	blacklist: ["theme"],
};

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({
		theme: themeReducer,
		auth: authReducer,
	})
);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

const persistor = persistStore(store);

export { store, persistor };
