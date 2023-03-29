export const setAchieved = (id, reps, load, ) => {
    return {
        type: "SET_ACHIEVED",
        id: id,
        data: {reps, load}
    }
}

export const loadWorkout = (id) => {
    return {
        type: "GET_WORKOUT",
        id: id
    }
}