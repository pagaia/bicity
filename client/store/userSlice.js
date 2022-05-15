import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// First, create the thunk
export const refreshToken = createAsyncThunk('users/refreshToken', async ({}, thunkAPI) => {
    const response = await axios.post(`/api/users/refresh-token`);
    // get the authorization from the header
    const { authorization } = response.headers;
    // get the user profile from the body
    const { data } = response;
    return { profile: data, authorization };
});

export const revokeToken = createAsyncThunk('users/revokeToken', async ({}, thunkAPI) => {
    const response = await axios.post(`/api/users/revoke-token`);
    // get the user profile from the body
    const { data } = response;
    return data;
});

export const userSlice = createSlice({
    name: 'users',
    initialState: {}, // loading: idle and pending
    reducers: {
        updateGeoLocation: (state, action) => {
            state.position = action.payload?.position;
            state.bbox = action.payload?.bbox;
            state.zoom = action.payload?.zoom;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(refreshToken.rejected, (state, action) => {
            state.errorRefreshToken = action.payload;
        });
        builder.addCase(revokeToken.fulfilled, (state, action) => {
            state.user = null;
        });
        builder.addCase(revokeToken.rejected, (state, action) => {
            state.errorRevokeToken = action.payload;
        });
    },
});

// action creator
export const { updateGeoLocation } = userSlice.actions;

// export selectors
export const selectUser = (state) => state.usersReducer.user;
export const selectPosition = (state) => state.usersReducer.position;

export default userSlice.reducer;
