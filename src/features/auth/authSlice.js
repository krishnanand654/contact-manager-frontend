/** Authentication slice allows for managing auth states within the application */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
        },

        logout(state) {
            state.isAuthenticated = false;
            state.token = null
        },
        refresh(state, action) {
            state.token = action.payload.token;
        }
    },
})

export const { login, logout, refresh } = authSlice.actions;

export default authSlice.reducer;
