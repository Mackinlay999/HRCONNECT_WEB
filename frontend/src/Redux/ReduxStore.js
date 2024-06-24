import {configureStore} from '@reduxjs/toolkit'
import ReduxSliceReducer from './ReduxSlice.js';
import ReduxFilterSlice from './ReduxFilterSlice.js';
import fetchJobDetails  from './JobSlice.js';
import  fetchUserData  from './UserSlice.js';
import { authReducer } from './UserSlice.js';
const ReduxStore = configureStore({
    reducer : {
        Assessment:ReduxSliceReducer,
        Filter : ReduxFilterSlice,
        Job:fetchJobDetails,
        User:fetchUserData,
        auth: authReducer,
    }
});
export default ReduxStore