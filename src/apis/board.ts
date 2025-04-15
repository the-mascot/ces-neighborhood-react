import createAxiosInstance from 'src/apis/axios';
import endpoints from 'src/apis/endpoints';
import { ApiResponse } from 'src/types/api.response';
import { Post, PostLikeReq, Posts } from 'src/types/board.type';

const axiosInstance = createAxiosInstance({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

/*게시물 목록 가져오기*/
export const fetchPosts = async (): Promise<ApiResponse<Posts[]>> => {
  return await axiosInstance.get(endpoints.board.posts).then((response) => response.data);
};

/*게시글 좋아요*/
export const updatePostLike = async (postLikeReq: PostLikeReq): Promise<ApiResponse<Posts[]>> => {
  return await axiosInstance.put(endpoints.board.like, postLikeReq).then((response) => response.data);
};

/*게시물 가져오기*/
export const fetchPost = async (postNo: number): Promise<ApiResponse<Post>> => {
  return await axiosInstance.get(`${endpoints.board.post}/${postNo}`).then((response) => response.data);
};
