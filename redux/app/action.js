
export const loginStart = () => {
    return {
        type: "LOGIN_START",
    }
}

export const loginSuccess = (auth) => {
    return {
        type: "LOGIN_SUCCESS",
        auth: auth
    }
}

export const loginFailure = (err) => {
    return {
        type: "LOGIN_FAILURE",
        err: err
    }
}
