import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoginInfo = {
  nickname: string;
  profileImage: string;
  isAuthenticated: boolean;
};

const initialState: LoginInfo = {
  nickname: '',
  profileImage: '',
  isAuthenticated: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ nickname: string; profileImage: string }>) => {
      state.nickname = action.payload.nickname;
      state.profileImage = action.payload.profileImage;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.nickname = '';
      state.profileImage = '';
      state.isAuthenticated = false;
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
