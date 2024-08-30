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
    checkNickname: getPath('/member/check/nickname'), // nickname 중복확인
    updateMemberInfo: getPath('/member/info'), // 회원정보변경
    profileInfo: getPath('/member/profile/info') // profile 정보 가져오기
  },
  board: {
    posts: getPath('/board/posts'), // 게시글 목록
    like: getPath('/board/post/like'), // 게시글 좋아요
    post: getPath('/board/post') // 게시글 상세
  }
};

export default endpoints;
