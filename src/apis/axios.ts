import axios, { AxiosError, AxiosInstance, AxiosResponse, CreateAxiosDefaults } from 'axios';

import { Constant } from 'src/constants/constant';
import { logout } from 'src/redux/slices/auth-slice';
import { store } from 'src/redux/store';
import { removeToken, setToken } from 'src/utils/token-utils';

/**-------------------------------- 요청 인터셉터 --------------------------------------*/
function setupInterceptors(instance: AxiosInstance): void {
  instance.interceptors.request.use((config) => {
    const accessToken = sessionStorage.getItem(Constant.ACCESS_TOKEN_HEADER_NAME);
    const refreshToken = sessionStorage.getItem(Constant.REFRESH_TOKEN_HEADER_NAME);

    if (accessToken && refreshToken) {
      config.headers.set(Constant.ACCESS_TOKEN_HEADER_NAME, accessToken);
      config.headers.set(Constant.REFRESH_TOKEN_HEADER_NAME, refreshToken);
    }

    return config;
  });

  /**-------------------------------- 응답 인터셉터 --------------------------------------*/
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const accessToken = response.headers[Constant.ACCESS_TOKEN_HEADER_NAME.toLowerCase()];
      const refreshToken = response.headers[Constant.REFRESH_TOKEN_HEADER_NAME.toLowerCase()];
      setToken(accessToken, refreshToken);

      return response;
    },
    async (error: AxiosError) => {
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
}

function createAxiosInstance(config: CreateAxiosDefaults<any>): AxiosInstance {
  const instance = axios.create(config);

  // 인터셉터 설정
  setupInterceptors(instance);

  return instance;
}

export default createAxiosInstance;
