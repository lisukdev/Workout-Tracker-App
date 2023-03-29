import {stat} from "@babel/core/lib/gensync-utils/fs";
import {ExampleWorkout} from "../../data/TestData";

const initialState = {
    activeWorkout: null,
    achievedSets: {},
}

export default (state = initialState, action) => {
    switch(action.type) {
        case "GET_WORKOUT":
            return {
                ...state,
                activeWorkout: JSON.parse(JSON.stringify(ExampleWorkout)),
                achievedSets: {},
            }
        case "SET_ACHIEVED":
            return {
                ...state,
                achievedSets: {
                    ...state.achievedSets,
                    [action.id]: action.data
                }
            };
        default:
            return state;
    }
}