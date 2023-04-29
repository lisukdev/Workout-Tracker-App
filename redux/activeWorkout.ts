import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {exerciseSetToString} from "../data/ExerciseSets";
import React from "react";
import uuid from "react-native-uuid";

const activeWorkoutSlice = createSlice({
    name: "activeWorkout",
    initialState: {
        workoutMetadata: null,
        workoutData: null,
        setData: {},
        setReferences: null,
        lastSetAchieved: null,
    },
    reducers: {
        setTarget: (state, action: PayloadAction<{id: string, target: string}>) => {
            state.setData[action.payload.id].target = action.payload.target
        },
        setAchieved: (state, action: PayloadAction<{id: string, achieved: string}>) => {
            console.log(action.payload)
            console.log(state.setData)
            const achievedTimestamp = state.setData[action.payload.id].restStartTimestamp || Date.now();
            const lastSetAchieved = state.lastSetAchieved;
            if (lastSetAchieved && lastSetAchieved.id !== action.payload.id) {
                state.setData[lastSetAchieved].restStartTimestamp = achievedTimestamp;
            }
            state.setData[action.payload.id].achieved = action.payload.achieved;
            state.setData[action.payload.id].restStartTimestamp = achievedTimestamp;
        },
        loadWorkout(state, action: PayloadAction<{workout: any}>) {
            const workout = action.payload.workout;
            const workoutMetadata = {
                id: uuid.v4().toString(),
                name: workout.name,
                notes: workout.notes,
            }
            const workoutData = [];
            const setData = {};
            const setReferences = {};
            const setIds = workout.exercises.map(exercise => exercise.sets.map(set => set.id)).flat();
            let ind = 0;
            for (const exercise of workout.exercises) {
                const exerciseId = uuid.v4().toString();
                let exerciseData = [];
                for (const exerciseSet of exercise.sets) {
                    const setId = uuid.v4().toString();
                    const prevSetId = ind > 0 ? setIds[ind - 1] : null;
                    const nextSetId = ind < setIds.length - 1 ? setIds[ind + 1] : null;
                    exerciseData.push({
                        id: setId,
                        prevSetId: prevSetId,
                        nextSetId: nextSetId,
                    });
                    setData[setId] = exerciseSetToString(exerciseSet);
                    ind += 1;
                }
                workoutData.push({
                    id: exerciseId,
                    name: exercise.name,
                    notes: exercise.notes,
                    tempo: exercise.tempo,
                    targetRestTime: exercise.targetRestTime,
                    data: exerciseData
                })
            }
            state.workoutMetadata = workoutMetadata;
            state.workoutData = workoutData;
            state.setData = setData;
            state.setReferences = setReferences;

        },
        setRef(state, action: PayloadAction<{setId: string, targetRef: React.Ref<HTMLInputElement | null>, achievedRef: React.Ref<HTMLInputElement | null>}>) {
            state.setReferences[action.payload.setId] = {targetRef: action.payload.targetRef, achievedRef: action.payload.achievedRef};
        },
        abandonWorkout(state, action: PayloadAction<void>) {
            state.workoutMetadata = null;
            state.workoutData = null;
            state.setData = {};
            state.setReferences = null;
            state.lastSetAchieved = null;
        },
        finishWorkout(state, action: PayloadAction<void>) {
            alert(JSON.stringify(state.setData))
        }
    }
})

export const actions = activeWorkoutSlice.actions
export default activeWorkoutSlice.reducer
