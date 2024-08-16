import { createSlice } from '@reduxjs/toolkit';
import { resetState } from 'jest-circus';

const initialState = {
  nickname: '',
  profileImage: '',
  isAuthenticated: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      state.nickname = action.payload.nickname;
      state.profileImage = action.payload.profileImage;
      state.isAuthenticated = true;
    },
    logoutReducer: (state) => {
      (state.nickname = ''), (state.profileImage = ''), (state.isAuthenticated = false);
    }
  }
});

export const { loginReducer, logoutReducer } = authSlice.actions;

export default authSlice.reducer;
