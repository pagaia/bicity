import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// First, create the thunk
export const fetchCategories = createAsyncThunk('fetchCategories', async ({}, thunkAPI) => {
    const response = await axios(`/api/categories`);
    const { data } = response;
    return data;
});

export const categorySlice = createSlice({
    name: 'category',
    initialState: { list: [], loading: 'idle', showModal: false }, // loading: idle and pending
    reducers: {
        chooseCategory: (state, action) => {
            // set the category selected
            state.list = state.list.map((category) => ({
                ...category,
                selected: !!action.payload[category._id],
            }));
        },
        showModal: (state, action) => {
            state.showModal = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending';
                    state.currentRequestId = action.meta.requestId;
                }
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                const { requestId } = action.meta;
                console.log({ action });

                const savedCategories = JSON.parse(localStorage.getItem('categories') ?? '[]');
                if (state.loading === 'pending' && state.currentRequestId === requestId) {
                    state.loading = 'idle';
                    state.list = action.payload.map((category) => ({
                        ...category,
                        selected: savedCategories?.[category._id],
                    }));
                    state.currentRequestId = undefined;
                }
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                const { requestId } = action.meta;
                if (state.loading === 'pending' && state.currentRequestId === requestId) {
                    state.loading = 'idle';
                    state.error = action.error;
                    state.currentRequestId = undefined;
                }
            });
    },
});

// Action creators are generated for each case reducer function
export const { chooseCategory, showModal } = categorySlice.actions;

// export selectors
export const selectCategories = (state) => state.categoryReducer.list;
export const selectChoosenCategories = (state) =>
    state.categoryReducer.list.filter((cat) => cat.selected);
export const selectShowModal = (state) => state.categoryReducer.showModal;

export default categorySlice.reducer;
