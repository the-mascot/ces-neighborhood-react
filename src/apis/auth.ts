import endpoints from 'src/apis/endpoints';
import { ApiResponse } from 'src/types/api.response';
import { JoinReq, LoginReq, LoginRes, OAuthLoginRes } from 'src/types/auth.type';

import createAxiosInstance from './axios';

const axiosInstance = createAxiosInstance({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 6000,
});

/*로그인*/
export const login = async (data: LoginReq): Promise<ApiResponse<LoginRes>> => {
  return await axiosInstance.post(endpoints.auth.login, data).then((response) => response.data);
};

/*회원가입*/
export const join = async (data: JoinReq): Promise<ApiResponse<null>> => {
  return await axiosInstance.post(endpoints.auth.join, data).then((response) => response.data);
};

/*oAuth 로그인*/
export const oAuthLogin = async (
  registrationId: string,
  code: string,
  state: string
): Promise<ApiResponse<OAuthLoginRes>> => {
  const encRegistrationId = encodeURIComponent(registrationId);
  const params = new URLSearchParams({ code, state });
  return await axiosInstance
    .get(`${endpoints.auth.oauth}/${encRegistrationId}?${params.toString()}`)
    .then((response) => response.data);
};
