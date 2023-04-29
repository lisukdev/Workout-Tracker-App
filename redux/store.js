import {configureStore} from "@reduxjs/toolkit";
import ActiveWorkoutReducer from "./activeWorkout";
import AppReducer from "./app";

export const store = configureStore({
    reducer: {
        app: AppReducer,
        activeWorkout: ActiveWorkoutReducer,
    }
})
