import axiosInstance from 'src/apis/axios';
import endpoints from 'src/apis/endpoints';
import { ApiResponse } from 'src/types/api.response';

/*ID 중복체크*/
export const checkIdDuplicate = async (userId: string): Promise<ApiResponse<boolean>> => {
  const encodedURL = encodeURIComponent(userId);

  return await axiosInstance.get(`${endpoints.member.check}/${encodedURL}`).then((response: any) => response.data);
};
