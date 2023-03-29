import {createStore, combineReducers} from "redux";
import WorkoutReducer from "./workout/reducer";

const rootReducer = combineReducers({
    workout: WorkoutReducer,
});

export const store = createStore(rootReducer);

