import { combineReducers } from 'redux';
import authSlice from '../features/auth/authSlice';


const rootReducer = combineReducers({
    auth: authSlice,
});

export default rootReducer;
