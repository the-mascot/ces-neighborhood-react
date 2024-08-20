import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'src/redux/slices/auth-slice';

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
