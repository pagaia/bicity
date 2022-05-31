import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// First, create the thunk
export const fetchOSMAmenities = createAsyncThunk(
    'osm/fetchAmenities',
    async ({ amenities, bbox }, thunkAPI) => {
        const { _northEast, _southWest } = bbox;
        const payload = encodeURI(`[out:json][timeout:25];
  // gather results
  (
    node[~"(amenity|emergency)"~"(${amenities})"](${_southWest.lat},${_southWest.lng},${_northEast.lat},${_northEast.lng});
  );
  // print results
  out geom;`);

        const overPassServers = [
            'https://overpass-api.de/api/interpreter',
            'https://lz4.overpass-api.de/api/interpreter',
            'https://z.overpass-api.de/api/interpreter',
            'https://overpass.osm.ch/api/interpreter',
        ];
        const body = `data=${payload}`;
        const response = await axios.post(overPassServers[0], body, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        });
        return response.data;
    }
);

export const osmSlice = createSlice({
    name: 'amenities',
    initialState: { loading: 'idle', amenities: [] }, // loading: idle and pending
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
        resetAmenities: (state, action) => {
            state.amenities = [];
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchOSMAmenities.fulfilled, (state, action) => {
            state.amenities = action.payload.elements;
        });
    },
});

// Action creators are generated for each case reducer function
export const { resetAmenities } = osmSlice.actions;

// export selectors
export const selectAmenity = (amenity) => (state) => state.osmReducer[amenity];
export const selectAmenities = (state) => state.osmReducer.amenities;

export default osmSlice.reducer;
