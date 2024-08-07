import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        //define functions in reducers that can update the state of redux directly
        signInStart : (state) => {
            state.loading = true;
        },
        signInSuccess : (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure : (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false
        },
        updateUserFailure : (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { signInSuccess, signInFailure, signInStart, updateUserStart, updateUserFailure, updateUserSuccess } = userSlice.actions;

export default userSlice.reducer;