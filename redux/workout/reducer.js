const initialState = {
    achievedSets: {},
}

export default (state = initialState, action) => {
    switch(action.type) {
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