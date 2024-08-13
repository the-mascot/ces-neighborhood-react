const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getPath = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

const endpoints = {
  auth: {
    login: getPath('/auth/login'), // 로그인
    join: getPath('/auth/join'), // 회원가입
    naverLogin: '/login/oauth2/code/naver', // 네이버로그인
    googleLogin: '/auth/google/login' // 구글로그인
  },
  member: {
    checkId: getPath('/member/check/id'), // ID 중복확인
    checkNickname: getPath('/member/check/nickname') // nickname 중복확인
  },
  board: {
    main: getPath('/board/main') // 게시판 메인
  }
};

export default endpoints;
