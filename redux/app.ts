import { createSlice, PayloadAction } from "@reduxjs/toolkit"
const appSlice = createSlice({
    name: "App",
    initialState: {
        loading: false,
        token: null,
        refreshToken: null,
    },
    reducers: {
        loginStart(state, action: PayloadAction<void>) {
            state.loading = true;
            state.refreshToken = null;
            state.token = null;
        },
        loginSuccess(state, action: PayloadAction<{token: string, refreshToken: string}>) {
            state.loading = false;
            state.refreshToken = action.payload.refreshToken;
            state.token = action.payload.token;
        },
        loginFailure(state, action: PayloadAction<void>) {
            state.loading = false;
            state.refreshToken = null;
            state.token = null;
        },
        logout(state, action: PayloadAction<void>) {
            state.loading = false;
            state.refreshToken = null;
            state.token = null;
        }
    },
})

export const actions = appSlice.actions
export default appSlice.reducer
