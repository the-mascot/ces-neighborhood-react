export interface Posts {
  postNo: number;
  nickname: string;
  title: string;
  content: string;
  viewCnt: number;
  likeCnt: number;
  isLiked: boolean;
  commentCnt: number;
  createDate: string;
  createElapsedTime: string;
  fileUrl: string;
  fileName: string;
}

export interface Post {
  postNo: number;
  title: string;
  content: string;
  delYn: string;
  viewCnt: number;
  isLiked: boolean;
  commentCnt: number;
  createDate: string;
  createElapsedTime: string;
  fileUrl: Attachment[];
}

export interface Attachment {
  fileUrl: string;
  fileName: string;
}

export type PostType = 'POST' | 'COMMENT' | 'REPLY';

export interface PostLikeReq {
  postNo: number;
  postType: PostType;
}
