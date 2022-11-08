import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('users/login', async ({ values }, thunkAPI) => {
    const body = JSON.stringify(values);
    const headers = { 'Content-Type': 'application/json' };

    const response = await axios.post('/api/users/login', body, { headers });

    // get the authorization from the header
    const authorization = response?.headers?.authorization;
    // get the user profile from the body
    const data = response?.data;

    return { profile: data, authorization };
});

// First, create the thunk
export const refreshToken = createAsyncThunk('users/refreshToken', async (params, thunkAPI) => {
    const response = await axios.post(`/api/users/refresh-token`);
    // get the authorization from the header
    const { authorization } = response.headers;
    // get the user profile from the body
    const { data } = response;
    return { profile: data, authorization };
});

export const revokeToken = createAsyncThunk('users/revokeToken', async (params, thunkAPI) => {
    const response = await axios.post(`/api/users/revoke-token`);
    // get the user profile from the body
    const { data } = response;
    return data;
});

export const getAllUsers = createAsyncThunk('users/getAll', async (params, thunkAPI) => {
    const response = await axios.get(`/api/users`);
    // get the users list  from the body
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
        sessionExpired: (state, action) => {
            state.sessionExpired = true;
            state.user = null;
        },
        resetSession: (state, action) => {
            state.sessionExpired = null;
            state.user = null;
        },
        logOut: (state, action) => {
            state.sessionExpired = null;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.user = action.payload;
            state.sessionExpired = null;
        });
        builder.addCase(refreshToken.rejected, (state, action) => {
            state.errorRefreshToken = action.payload;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.sessionExpired = null;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            console.debug({ action });
            state.errorLogin = action.payload;
        });
        builder.addCase(revokeToken.fulfilled, (state, action) => {
            state.user = null;
        });
        builder.addCase(revokeToken.rejected, (state, action) => {
            state.errorRevokeToken = action.payload;
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.usersList = action.payload;
        });
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

// action creator
export const { updateGeoLocation, sessionExpired, resetSession, logOut } = userSlice.actions;

// export selectors
export const selectUser = (state) => state.usersReducer.user;
export const selectSessionExpired = (state) => state.usersReducer.sessionExpired;
export const selectPosition = (state) => state.usersReducer.position;

export default userSlice.reducer;
