import { Constant } from 'src/constants/constant';

/**-------------------------------- funtion --------------------------------------*/
// 토큰이 존재하면 세션 스토리지에 저장합니다.
export const setToken = (accessToken: string, refreshToken: string): void => {
  if (accessToken) {
    sessionStorage.setItem(Constant.ACCESS_TOKEN_HEADER_NAME, accessToken);
  }
  if (refreshToken) {
    sessionStorage.setItem(Constant.REFRESH_TOKEN_HEADER_NAME, refreshToken);
  }
};

/*storage session 에서 토큰 삭제 후 로그인 페이지 리다이렉트*/
export const removeToken = (): void => {
  sessionStorage.removeItem(Constant.ACCESS_TOKEN_HEADER_NAME);
  sessionStorage.removeItem(Constant.REFRESH_TOKEN_HEADER_NAME);
};
