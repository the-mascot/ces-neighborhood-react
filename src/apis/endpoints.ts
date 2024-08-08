const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getPath = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

const endpoints = {
  auth: {
    login: getPath('/auth/login'), // 로그인
    join: getPath('/auth/join') // 회원가입
  },
  member: {
    check: getPath('/member/check') // ID 중복확인
  },
  board: {
    main: getPath('/board/main') // 게시판 메인
  }
};

export default endpoints;
