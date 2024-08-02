import { axiosInstance } from 'src/apis/axios';
import CONTROLLER from 'src/apis/controller';

/*로그인*/
export const login = async (data: any) => {
  return await axiosInstance.post(CONTROLLER.pathAuthLogin, data);
};
