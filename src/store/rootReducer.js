import { combineReducers } from 'redux';
import authSlice from '../features/auth/authSlice';
import userSlice from '../features/user/userSlice';
import updateSlice from '../features/update/updateSlice';


const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,
    update: updateSlice,
});

export default rootReducer;
