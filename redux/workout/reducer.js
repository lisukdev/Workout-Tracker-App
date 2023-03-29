import {ExampleWorkout} from "../../data/TestData";
import {exerciseSetToString} from "../../data/ExerciseSets";
import uuid from "react-native-uuid";

const initialState = {
    workoutMetadata: null,
    workoutData: null,
    setData: {},
}

export default (state = initialState, action) => {
    switch(action.type) {
        case "FINISH_WORKOUT":
            alert(JSON.stringify(state.setData));
            return state;
        case "SET_TARGET":
            return {
                ...state,
                setData: {
                    ...state.setData,
                    ...({[action.id]: {...(state.setData[action.id]), target: action.target}}),
                }
            };
        case "SET_ACHIEVED":
            return {
                ...state,
                setData: {
                    ...state.setData,
                    ...{[action.id]: {...state.setData[action.id], achieved: action.achieved}}
                },
            };
        case "ADD_SET":
            for (const exercise of state.workoutData) {
                if (exercise.id === action.id) {
                    const newSet = {
                        id: uuid.v4(),
                        target: "",
                        achieved: "",
                    }
                    return {
                        ...state,
                        setData: {
                            ...state.setData,
                            ...{[newSet.id]: newSet}
                        },
                        workoutData: state.workoutData.map(exercise => {
                            if (exercise.id === action.id) {
                                return {
                                    ...exercise,
                                    data: [...exercise.data, {id: newSet.id}]
                                }
                            }
                            return exercise;
                        })
                    }
                }
            }

        case "GET_WORKOUT":
            const workoutMetadata = {
                id: ExampleWorkout.id,
                name: ExampleWorkout.name,
                notes: ExampleWorkout.notes,
            }
            const workoutData = [];
            const setData = {};
            for (const exercise of ExampleWorkout.exercises) {
                workoutData.push({
                    id: exercise.id,
                    name: exercise.name,
                    notes: exercise.notes,
                    tempo: exercise.tempo,
                    targetRestTime: exercise.targetRestTime,
                    data: exercise.sets.map(set => {return {id: set.id}}),
                })
                for (const set of exercise.sets) {
                    setData[set.id] = exerciseSetToString(set);
                }
            }

            return {
                ...state,
                workoutMetadata: workoutMetadata,
                workoutData: workoutData,
                setData: setData,
            }
        default:
            return state;
    }
}