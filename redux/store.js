import {configureStore} from "@reduxjs/toolkit";
import ActiveWorkoutReducer from "./activeWorkout";
import AppReducer from "./app";
import {emptySplitApi} from "./emptyApi";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        app: AppReducer,
        activeWorkout: ActiveWorkoutReducer,
        [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(emptySplitApi.middleware),
})

setupListeners(store.dispatch)