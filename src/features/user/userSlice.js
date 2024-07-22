import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser(state, action) {
            state.userData = action.payload.userData;
        },
    }

})

export const { getUser } = userSlice.actions;

export default userSlice.reducer;