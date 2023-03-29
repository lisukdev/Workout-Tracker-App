export const finishWorkout = (id) => {
    return {
        type: "FINISH_WORKOUT",
        id: id,
    }
}

export const addSet = (id) => {
    return {
        type: "ADD_SET",
        id: id,
    }
}

export const loadWorkout = (id) => {
    return {
        type: "GET_WORKOUT",
        id: id
    }
}

export function updateTarget(id, target) {
    return {
        type: "SET_TARGET",
        id: id,
        target: target,
    }
}

export function updateAchieved(id, achieved) {
    return {
        type: "SET_ACHIEVED",
        id: id,
        achieved: achieved,
    }
}