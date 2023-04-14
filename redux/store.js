import {createStore, combineReducers} from "redux";
import WorkoutReducer from "./activeWorkout/reducer";

const rootReducer = combineReducers({
    activeWorkout: WorkoutReducer,
});

export const store = createStore(rootReducer);

