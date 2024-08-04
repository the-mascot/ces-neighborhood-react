/*로그인*/
import axiosInstance from 'src/apis/axios';
import endpoints from 'src/apis/endpoints';

export const fetchPosts = async () => {
  return await axiosInstance.get(endpoints.board.main).then((response: any) => response.data);
};
