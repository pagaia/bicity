import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const errorSlice = createSlice({
    name: 'error',
    initialState: { errors: [] }, // loading: idle and pending
    reducers: {
        showError: (state, action) => {
            const error = { ...action.payload, id: nanoid(5) };
            state.errors.push(error);
        },
        removeError: (state, action) => {
            console.log({ action });
            state.errors = state.errors.filter((error) => error.id !== action.payload.id);
        },
    },
});

// action creator
export const { showError, removeError } = errorSlice.actions;

// export selectors
export const selectErrors = (state) => state.errorReducer.errors;

export default errorSlice.reducer;
