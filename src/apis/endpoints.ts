const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getPath = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

const endpoints = {
  auth: {
    login: getPath('/auth/login'), // 로그인
    join: getPath('/auth/join'), // 회원가입
    oauth: getPath('/oauth') // oAuth 로그인
  },
  oAuth: {
    naver: 'https://nid.naver.com/oauth2.0/authorize',
    google: 'https://accounts.google.com/o/oauth2/v2/auth'
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
