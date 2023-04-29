import {createStore, combineReducers} from "redux";
import AppReducer from "./app/reducer";
import WorkoutReducer from "./activeWorkout/reducer";

const rootReducer = combineReducers({
    app: AppReducer,
    activeWorkout: WorkoutReducer,
});

export const store = createStore(rootReducer);

