/*로그인*/
import axiosInstance from 'src/apis/axios';
import endpoints from 'src/apis/endpoints';
import { ApiResponse } from 'src/types/api.response';
import { Posts } from 'src/types/board.type';
import { AxiosResponse } from 'axios';

export const fetchPosts = async () => {
  return await axiosInstance
    .get(endpoints.board.main)
    .then((response: AxiosResponse<ApiResponse<Posts[]>>) => response.data);
};
