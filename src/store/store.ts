import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { RootState } from "./types";

export const rootReducer = combineReducers({
	// exampleReducer: exampleReducer,
});

export const setupStore = (initialState?: RootState) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
	});
};
