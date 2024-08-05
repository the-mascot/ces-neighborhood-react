import axios from 'axios';

const ACCESS_TOKEN_HEADER_NAME = 'Access-token';
const REFRESH_TOKEN_HEADER_NAME = 'Refresh-token';

// Axios 인스턴스를 생성합니다.
const axiosInstance = axios.create({
  withCredentials: false,
  timeout: 8000
});

/**-------------------------------- 요청 인터셉터 --------------------------------------*/
axiosInstance.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem(ACCESS_TOKEN_HEADER_NAME);
  const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_HEADER_NAME);
  console.log('===== accessToken ===== : ', accessToken);
  console.log('===== refreshToken ===== : ', refreshToken);

  if (accessToken && refreshToken) {
    config.headers.setAuthorization(accessToken);
    config.headers.set(REFRESH_TOKEN_HEADER_NAME, refreshToken);
  }

  return config;
});

/**-------------------------------- 응답 인터셉터 --------------------------------------*/
axiosInstance.interceptors.response.use(
  (response: any) => {
    const accessToken = response.headers[ACCESS_TOKEN_HEADER_NAME.toLowerCase()];
    const refreshToken = response.headers[REFRESH_TOKEN_HEADER_NAME.toLowerCase()];
    console.log('===== accessToken ===== : ', accessToken);
    console.log('===== refreshToken ===== : ', refreshToken);
    // 토큰이 존재하면 세션 스토리지에 저장합니다.
    if (accessToken) {
      sessionStorage.setItem(ACCESS_TOKEN_HEADER_NAME, accessToken);
    }
    if (refreshToken) {
      sessionStorage.setItem(REFRESH_TOKEN_HEADER_NAME, refreshToken);
    }

    return response;
  },
  (error) => {
    switch (error) {
      case 404:
        resetSession();
        break;
      default:
        return Promise.reject(error);
    }
  }
);

/**-------------------------------- 초기화 --------------------------------------*/
const resetSession = () => {
  sessionStorage.removeItem(ACCESS_TOKEN_HEADER_NAME);
  sessionStorage.removeItem(ACCESS_TOKEN_HEADER_NAME);
  window.location.href = `${window.location.origin}/`;
};

export default axiosInstance;
