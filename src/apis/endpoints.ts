const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getPath = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

const endpoints = {
  auth: {
    login: getPath('/auth/login') // 로그인
  },
  board: {
    main: getPath('/board/main') // 게시판 메인
  }
};

export default endpoints;
