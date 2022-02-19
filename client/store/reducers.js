import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import featureReducer from './featureSlice';
import osmReducer from './osmSlice';

export default configureStore({
    reducer: {
        osmReducer,
        featureReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
