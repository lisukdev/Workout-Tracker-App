const initialState = {
    loading: false,
    auth: null,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case "LOGIN_START":
            console.log("Login start"
            )
            return {
                ...state,
                loading: true,
                auth: null,
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                auth: action.auth,
            }
        case "LOGIN_FAILURE":
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}