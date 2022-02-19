import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// First, create the thunk
export const fetchVote = createAsyncThunk(
    'vote/fetchByFetureId',
    async ({ featureId }, thunkAPI) => {
        const response = await axios(`/api/vote/feature/${featureId}`);
        const { data } = response;
        return data;
    }
);

// First, create the thunk
export const fetchFeatures = createAsyncThunk('fetchFeaturesAction', async ({ position }, thunkAPI) => {
    const response = await axios(`/api/feature/nearme?lat=${position?.lat}&lng=${position?.lng}`);
    const { data } = response;
    return data;
});

export const featureSlice = createSlice({
    name: 'feature',
    initialState: { features: [], votes: [], loading: 'idle' }, // loading: idle and pending
    reducers: {
        // increment: state => {
        //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //   // doesn't actually mutate the state because it uses the Immer library,
        //   // which detects changes to a "draft state" and produces a brand new
        //   // immutable state based off those changes
        //   state.value += 1
        // },
        // decrement: state => {
        //   state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //   state.value += action.payload
        // }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchVote.fulfilled, (state, action) => {
            const { featureId } = action?.meta?.arg;
            state.votes[featureId] = action.payload.average;
        });
        builder.addCase(fetchVote.rejected, (state, action) => {
            const { featureId } = action?.meta?.arg;
            console.log({ action });
            state.votes[featureId] = action.payload;
        });
        builder.addCase(fetchFeatures.fulfilled, (state, action) => {
            state.features = action.payload;
        });
        builder.addCase(fetchFeatures.rejected, (state, action) => {
            console.log({ action });
            state.error = action.payload;
        });
    },
});

// Action creators are generated for each case reducer function
export const { fetchVoteAction, fetchFeaturesAction } = featureSlice.actions;

// export selectors
export const selectFeatureVote = (featureId) => (state) => state.featureReducer.votes[featureId];
export const selectFeatures = (state) => state.featureReducer.features;

export default featureSlice.reducer;
