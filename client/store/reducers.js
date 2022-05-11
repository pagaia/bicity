import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import featureReducer from './featureSlice';
import osmReducer from './osmSlice';
import errorReducer from './errorSlice';
import usersReducer from './userSlice';
import categoryReducer from './categorySlice';
// import { throttle } from './reduxUtils';

export default configureStore({
    reducer: {
        osmReducer,
        featureReducer,
        errorReducer,
        usersReducer,
        categoryReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
