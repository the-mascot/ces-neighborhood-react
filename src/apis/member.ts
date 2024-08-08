import axiosInstance from 'src/apis/axios';
import endpoints from 'src/apis/endpoints';

/*ID 중복체크*/
export const verifyIdDuplicate = async (userId: string) => {
  return await axiosInstance.get(endpoints.member.check).then((response: any) => response.data);
};
