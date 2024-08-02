const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getPath = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

const CONTROLLER = {
  pathAuthLogin: getPath('/login') // 로그인
};

export default CONTROLLER;
