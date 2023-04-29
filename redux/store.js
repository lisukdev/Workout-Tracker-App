import {configureStore} from "@reduxjs/toolkit";
import ActiveWorkoutReducer from "./activeWorkout";

export const store = configureStore({
    reducer: {
        activeWorkout: ActiveWorkoutReducer,
    }
})

