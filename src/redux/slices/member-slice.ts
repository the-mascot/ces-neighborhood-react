import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { MemberReducerType } from 'src/types/member.type';

const initialState: MemberReducerType = {
  nickname: '',
  profileImage: ''
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setProfileInfo: (state, action) => {
      state.nickname = action.payload.nickname;
      state.profileImage = action.payload.profileImage;
    },
    resetProfile: (state) => {
      (state.nickname = ''), (state.profileImage = '');
    }
  }
});

export const { setProfileInfo, resetProfile } = memberSlice.actions;

export default memberSlice.reducer;

export const profileInfo = (state: RootState) => state.memberInfo;
