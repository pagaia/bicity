import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import osmReducer from './osmSlice';

export default configureStore({
    reducer: {
        osmReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
