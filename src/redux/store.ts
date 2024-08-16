import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/redux/slices/auth-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export default store;
