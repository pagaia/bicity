import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DATABASES } from '../utils/constants';

// First, create the thunk
export const fetchVote = createAsyncThunk(
    'vote/fetchByFeatureId',
    async ({ featureId }, thunkAPI) => {
        const response = await axios(`/api/vote/feature/${featureId}`);
        const { data } = response;
        return data;
    }
);

export const fetchFavorites = createAsyncThunk(
    'feature/favorites',
    async ({ userId }, thunkAPI) => {
        const response = await axios(`/api/favorite/${userId}`);
        const { data } = response;
        return data;
    }
);

export const fetchTotalFavorites = createAsyncThunk(
    'feature/favorites/total',
    async ({ userId }, thunkAPI) => {
        const response = await axios(`/api/favorite/${userId}/totalNumber`);
        const { data } = response;
        return data;
    }
);

export const setFavorite = createAsyncThunk(
    'feature/setFavorite',
    async ({ userId, featureId }, thunkAPI) => {
        const response = await axios.post(`/api/favorite/${userId}/${featureId}`);
        const { data } = response;
        return data;
    }
);

export const removeFavorite = createAsyncThunk(
    'feature/removeFavorite',
    async ({ userId, featureId }, thunkAPI) => {
        // first delete
        let response = await axios.delete(`/api/favorite/${userId}/${featureId}`);
        // once done fetch again the list of favorites
        response = await axios(`/api/favorite/${userId}`);
        const { data } = response;
        return data;
    }
);
export const fetchFeatures = createAsyncThunk(
    'fetchFeaturesAction',
    async ({ position, categories }, thunkAPI) => {
        const response = await axios(
            `/api/feature/nearme?lat=${position?.lat}&lng=${
                position?.lng
            }&categories=${categories?.join(',')}`
        );
        const { data } = response;
        return data;
    }
);

export const fetchMultiFeatures = createAsyncThunk(
    'fetchMultiFeaturesAction',
    async ({ bbox }, thunkAPI) => {
        const { _northEast, _southWest } = bbox;
        const { lat: nlat, lng: nlng } = _northEast;
        const { lat: slat, lng: slng } = _southWest;
        const query = `nlat=${nlat}&nlng=${nlng}&slat=${slat}&slng=${slng}`;
        console.debug({ query });

        const response = await axios(`/api/multifeature?${query}`);
        const { data } = response;
        return data;
    }
);

export const fetchFeaturesByBbox = createAsyncThunk(
    'fetchFeaturesByBbox',
    async ({ bbox, categories }, thunkAPI) => {
        const { _northEast, _southWest } = bbox;
        const { lat: nlat, lng: nlng } = _northEast;
        const { lat: slat, lng: slng } = _southWest;
        const query = `nlat=${nlat}&nlng=${nlng}&slat=${slat}&slng=${slng}&categories=${categories?.join(
            ','
        )}`;
        console.debug({ query });

        const response = await axios(`/api/feature/bbox?${query}`);
        const { data } = response;
        return data;
    }
);

export const addFeature = createAsyncThunk('addFeatureAction', async ({ feature }, thunkAPI) => {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(feature);
    const response = await axios.post('/api/feature', body, { headers });
    const { data } = response;
    return data;
});

export const featureSlice = createSlice({
    name: 'feature',
    initialState: {
        features: [],
        favorites: [],
        showFavorites: false,
        multiFeatures: [],
        votes: [],
        loading: 'idle',
        databases: [],
    },
    reducers: {
        featureSelected: (state, action) => {
            state.featureSelected = action.payload;
        },
        chooseDatabase: (state, action) => {
            // set the database selected
            state.databases = state.databases.map((database) => ({
                ...database,
                selected: !!action.payload[database.name],
            }));
        },
        toggleFavorites: (state, action) => {
            state.showFavorites = !state.showFavorites;
        },
        resetFavorites: (state, action) => {
            state.showFavorites = false;
            state.favorites = [];
        },
        loadDatabases: (state, action) => {
            const defaultDatabases = Object.values(DATABASES).map((database) => ({
                name: database,
                selected: true,
            })); // by default both DBs are selected

            // read database from localStorage or load the default ones
            if (localStorage.getItem('databases')) {
                const savedDatabases = JSON.parse(localStorage.getItem('databases') ?? '[]');

                state.databases = defaultDatabases.map((database) => ({
                    ...database,
                    selected: savedDatabases?.[database.name],
                }));
            } else {
                state.databases = defaultDatabases;
            }
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchVote.fulfilled, (state, action) => {
            const { featureId } = action?.meta?.arg;
            state.votes[featureId] = action.payload.average;
        });
        builder.addCase(fetchVote.rejected, (state, action) => {
            const { featureId } = action?.meta?.arg;
            state.votes[featureId] = action.payload;
        });
        builder.addCase(fetchFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload;
        });
        builder.addCase(fetchFavorites.rejected, (state, action) => {
            state.error = action.payload;
        });

        builder.addCase(fetchTotalFavorites.fulfilled, (state, action) => {
            state.totalFavorites = action.payload.favorites;
        });
        builder.addCase(fetchTotalFavorites.rejected, (state, action) => {
            state.error = action.payload;
        });
        builder.addCase(setFavorite.fulfilled, (state, action) => {
            state.favorites = action.payload?.features;
        });
        builder.addCase(setFavorite.rejected, (state, action) => {
            state.error = action.payload;
        });
        builder.addCase(removeFavorite.fulfilled, (state, action) => {
            state.favorites = action.payload;
        });
        builder.addCase(removeFavorite.rejected, (state, action) => {
            state.error = action.payload;
        });

        builder.addCase(fetchFeaturesByBbox.fulfilled, (state, action) => {
            state.features = action.payload;
            const { bbox, categories } = action?.meta?.arg;
            const { _northEast, _southWest } = bbox;
            const { lat: nlat, lng: nlng } = _northEast;
            const { lat: slat, lng: slng } = _southWest;
            state.bbox = { _northEast: { nlng, nlat }, _southWest: { slng, slat } };
            state.selectedCategories = categories;
        });
        builder.addCase(fetchFeaturesByBbox.rejected, (state, action) => {
            state.error = action.payload;
        });
        builder.addCase(fetchFeatures.fulfilled, (state, action) => {
            state.features = action.payload;
        });
        builder.addCase(fetchFeatures.rejected, (state, action) => {
            state.error = action.payload;
        });
        builder.addCase(fetchMultiFeatures.fulfilled, (state, action) => {
            state.multiFeatures = action.payload;
        });
        builder.addCase(fetchMultiFeatures.rejected, (state, action) => {
            state.error = action.payload;
        });
        builder.addCase(addFeature.fulfilled, (state, action) => {
            state.addedFeature = action.payload;
        });
        builder.addCase(addFeature.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

// Action creators are generated for each case reducer function
export const {
    fetchVoteAction,
    fetchFeaturesAction,
    featureSelected,
    chooseDatabase,
    loadDatabases,
    toggleFavorites,
    resetFavorites,
} = featureSlice.actions;

// export selectors
export const selectFeatureVote = (featureId) => (state) => state.featureReducer.votes[featureId];
export const selectFeatures = (state) => state.featureReducer.features;
export const selectFeatureId = (state) => state.featureReducer.featureSelected;
export const selectMultiFeatures = (state) => state.featureReducer.multiFeatures;
export const selectAddedFeature = (state) => state.featureReducer.addedFeature;
export const selectFeatureError = (state) => state.featureReducer.error;
export const selectFavoritesFeatures = (state) => state.featureReducer.favorites;
export const selectTotalFavorites = (state) => state.featureReducer.totalFavorites;
export const selectShowFavorites = (state) => state.featureReducer.showFavorites;
export const selectDatabases = (state) => state.featureReducer.databases;

export default featureSlice.reducer;
