export interface LoginReq {
  userId: string;
  password: string;
}

export interface LoginRes {
  nickname: string;
  profileImage: string;
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

export interface OAuthLoginRes {
  isNewMember: boolean;
  nickname: string;
  profileImage: string;
}

export interface AuthReducerType {
  isAuthenticated: boolean;
}
