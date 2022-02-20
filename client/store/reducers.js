import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import featureReducer from './featureSlice';
import osmReducer from './osmSlice';
import errorReducer from './errorSlice';

export default configureStore({
    reducer: {
        osmReducer,
        featureReducer,
        errorReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
