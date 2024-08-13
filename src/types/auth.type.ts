export interface LoginReq {
  userId: string;
  password: string;
}

export interface JoinReq {
  userId: string;
  password: string;
  nickname: string;
}

export interface OAuthLoginReq {
  code: string;
  state: string;
}
