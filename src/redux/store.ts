import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/redux/slices/auth-slice';
import memberReducer from 'src/redux/slices/member-slice';

export const store = configureStore({
  reducer: {
    authInfo: authReducer,
    memberInfo: memberReducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
