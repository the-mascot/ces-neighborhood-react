import { AxiosResponse } from 'axios';

import endpoints from 'src/apis/endpoints';
import { ApiResponse } from 'src/types/api.response';
import { UpdateMemberInfoReq } from 'src/types/member.type';
import { LoginRes } from 'src/types/auth.type';
import createAxiosInstance from 'src/apis/axios';

const axiosInstance = createAxiosInstance({
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

/*ID 중복체크*/
export const checkIdDuplicate = async (userId: string): Promise<ApiResponse<boolean>> => {
  const encodedUserId = encodeURIComponent(userId);

  return await axiosInstance.get(`${endpoints.member.checkId}/${encodedUserId}`).then((response) => response.data);
};

/*닉네임 중복체크*/
export const checkNicknameDuplicate = async (nickname: string): Promise<ApiResponse<boolean>> => {
  const encodedURL = encodeURIComponent(nickname);

  return await axiosInstance.get(`${endpoints.member.checkNickname}/${encodedURL}`).then((response) => response.data);
};

/*회원정보변경*/
export const updateMemberInfo = async (nickname: UpdateMemberInfoReq): Promise<ApiResponse<null>> => {
  return await axiosInstance.put(endpoints.member.updateMemberInfo, nickname).then((response) => response.data);
};

/*profile 정보 가져오기*/
export const fetchProfileInfo = async (): Promise<ApiResponse<LoginRes>> => {
  return await axiosInstance.get(endpoints.member.profileInfo).then((response) => response.data);
};
