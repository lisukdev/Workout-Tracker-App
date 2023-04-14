import {createStore, combineReducers} from "redux";
import WorkoutReducer from "./workout/reducer";

const rootReducer = combineReducers({
    activeWorkout: WorkoutReducer,
});

export const store = createStore(rootReducer);

