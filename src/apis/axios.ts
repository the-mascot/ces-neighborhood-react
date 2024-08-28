import axios from 'axios';
import { store } from 'src/redux/store';
import { logout } from 'src/redux/slices/auth-slice';
import { Constant } from 'src/constants/constant';
import { removeToken, setToken } from 'src/utils/token-utils';

// Axios 인스턴스를 생성합니다.
const axiosInstance = axios.create({
  withCredentials: true,
  timeout: 8000
});

/**-------------------------------- 요청 인터셉터 --------------------------------------*/
axiosInstance.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem(Constant.ACCESS_TOKEN_HEADER_NAME);
  const refreshToken = sessionStorage.getItem(Constant.REFRESH_TOKEN_HEADER_NAME);

  if (accessToken && refreshToken) {
    config.headers.set(Constant.ACCESS_TOKEN_HEADER_NAME, accessToken);
    config.headers.set(Constant.REFRESH_TOKEN_HEADER_NAME, refreshToken);
  }

  return config;
});

/**-------------------------------- 응답 인터셉터 --------------------------------------*/
axiosInstance.interceptors.response.use(
  (response: any) => {
    const accessToken = response.headers[Constant.ACCESS_TOKEN_HEADER_NAME.toLowerCase()];
    const refreshToken = response.headers[Constant.REFRESH_TOKEN_HEADER_NAME.toLowerCase()];
    setToken(accessToken, refreshToken);

    return response;
  },
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 403:
          store.dispatch(logout());
          removeToken();
          window.location.href = `${window.location.origin}/login`;
          break;
        default:
          return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
