import { combineReducers } from 'redux';
import authSlice from '../features/auth/authSlice';
import userSlice from '../features/user/userSlice';


const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,

});

export default rootReducer;
