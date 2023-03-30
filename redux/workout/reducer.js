import {ExampleWorkout} from "../../data/TestData";
import {exerciseSetToString} from "../../data/ExerciseSets";
import uuid from "react-native-uuid";
import {createRef} from "react";

const initialState = {
    workoutMetadata: null,
    workoutData: null,
    setData: {},
    setReferences: null,
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
            const setReferences = {};
            const setIds = ExampleWorkout.exercises.map(exercise => exercise.sets.map(set => set.id)).flat();
            let ind = 0;
            for (const exercise of ExampleWorkout.exercises) {
                let exerciseData = []
                for (const set of exercise.sets) {
                    const prevSetId = ind > 0 ? setIds[ind - 1] : null;
                    const nextSetId = ind < setIds.length - 1 ? setIds[ind + 1] : null;
                    exerciseData.push({
                        id: set.id,
                        prevSetId: prevSetId,
                        nextSetId: nextSetId,
                    })
                    setData[set.id] = exerciseSetToString(set);
                    setReferences[set.id] = {targetRef: createRef(), achievedRef: createRef()};
                    ind += 1
                }
                workoutData.push({
                    id: exercise.id,
                    name: exercise.name,
                    notes: exercise.notes,
                    tempo: exercise.tempo,
                    targetRestTime: exercise.targetRestTime,
                    data: exerciseData
                })
            }
            console.log(setReferences)

            return {
                ...state,
                workoutMetadata: workoutMetadata,
                workoutData: workoutData,
                setData: setData,
                setReferences: setReferences,
            }
        default:
            return state;
    }
}