import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { AuthReducerType } from 'src/types/auth.type';

const initialState: AuthReducerType = {
  isAuthenticated: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginReducer: (state) => {
      state.isAuthenticated = true;
    },
    logoutReducer: (state) => {
      state.isAuthenticated = false;
    }
  }
});

export const { loginReducer, logoutReducer } = authSlice.actions;

export default authSlice.reducer;

export const authInfo = (state: RootState) => state.authInfo;
