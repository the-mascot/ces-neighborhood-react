import axiosInstance from 'src/apis/axios';
import endpoints from 'src/apis/endpoints';
import { LoginReq } from 'src/types/auth.type';

/*로그인*/
export const login = async (data: LoginReq) => {
  return await axiosInstance.post(endpoints.auth.login, data).then((response: any) => response.data);
};
