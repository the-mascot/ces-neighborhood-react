import axiosInstance from 'src/apis/axios';
import endpoints from 'src/apis/endpoints';
import { JoinReq, LoginReq, OAuthLoginReq } from 'src/types/auth.type';
import { AxiosResponse } from 'axios';
import { ApiResponse } from 'src/types/api.response';

/*로그인*/
export const login = async (data: LoginReq): Promise<ApiResponse<null>> => {
  return await axiosInstance
    .post(endpoints.auth.login, data)
    .then((response: AxiosResponse<ApiResponse<null>>) => response.data);
};

/*회원가입*/
export const join = async (data: JoinReq): Promise<ApiResponse<null>> => {
  return await axiosInstance
    .post(endpoints.auth.join, data)
    .then((response: AxiosResponse<ApiResponse<null>>) => response.data);
};

/*oAuth 로그인*/
export const oAuthLogin = async (registrationId: string, code: string, state: string): Promise<ApiResponse<any>> => {
  return await axiosInstance
    .get(`${endpoints.auth.oauth}/${registrationId}?code=${code}&state=${state}`)
    .then((response: AxiosResponse<ApiResponse<null>>) => response.data);
};
