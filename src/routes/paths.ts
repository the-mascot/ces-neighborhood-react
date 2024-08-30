export const paths = {
  home: '/',
  auth: {
    login: '/login',
    join: '/join',
    oauth: '/login/:registrationId'
  },
  board: {
    posts: '/board/posts',
    post: '/board/post/:postNo'
  },
  error: {
    p403: '/403',
    p404: '/404',
    p500: '/500'
  }
};
