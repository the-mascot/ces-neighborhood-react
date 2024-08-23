import axiosInstance from 'src/apis/axios';
import endpoints from 'src/apis/endpoints';
import { ApiResponse } from 'src/types/api.response';
import { AxiosResponse } from 'axios';
import { UpdateMemberInfoReq } from 'src/types/member.type';
import { LoginRes } from 'src/types/auth.type';

/*ID 중복체크*/
export const checkIdDuplicate = async (userId: string) => {
  const encodedURL = encodeURIComponent(userId);

  return await axiosInstance
    .get(`${endpoints.member.checkId}/${encodedURL}`)
    .then((response: AxiosResponse<ApiResponse<boolean>>) => response.data);
};

/*닉네임 중복체크*/
export const checkNicknameDuplicate = async (nickname: string) => {
  const encodedURL = encodeURIComponent(nickname);

  return await axiosInstance
    .get(`${endpoints.member.checkNickname}/${encodedURL}`)
    .then((response: AxiosResponse<ApiResponse<boolean>>) => response.data);
};

/*회원정보변경*/
export const updateMemberInfo = async (nickname: UpdateMemberInfoReq) => {
  return await axiosInstance
    .put(endpoints.member.updateMemberInfo, nickname)
    .then((response: AxiosResponse<ApiResponse<null>>) => response.data);
};

/*profile 정보 가져오기*/
export const fetchProfileInfo = async () => {
  return await axiosInstance
    .get(endpoints.member.profileInfo)
    .then((response: AxiosResponse<ApiResponse<LoginRes>>) => response.data);
};
