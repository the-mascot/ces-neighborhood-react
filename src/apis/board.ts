import axiosInstance from 'src/apis/axios';
import endpoints from 'src/apis/endpoints';
import { ApiResponse } from 'src/types/api.response';
import { PostLikeReq, Posts } from 'src/types/board.type';
import { AxiosResponse } from 'axios';

/*게시물 목록 가져오기*/
export const fetchPosts = async () => {
  return await axiosInstance
    .get(endpoints.board.posts)
    .then((response: AxiosResponse<ApiResponse<Posts[]>>) => response.data);
};

/*게시글 좋아요*/
export const updatePostLike = async (postLikeReq: PostLikeReq) => {
  return await axiosInstance
    .put(endpoints.board.like, postLikeReq)
    .then((response: AxiosResponse<ApiResponse<Posts[]>>) => response.data);
};
