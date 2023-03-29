export const setAchieved = (id, reps, load, ) => {
    return {
        type: "SET_ACHIEVED",
        id: id,
        data: {reps, load}
    }
}