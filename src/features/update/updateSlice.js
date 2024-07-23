import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    updateState: false,
};

const updateSlice = createSlice({
    name: 'update',
    initialState,
    reducers: {
        toggleUpdateState(state) {
            state.updateState = !state.updateState;
        }
    }
});

export const { toggleUpdateState } = updateSlice.actions;

export default updateSlice.reducer;
