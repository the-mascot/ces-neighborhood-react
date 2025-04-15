// react
import { JSX, JSXElementConstructor, lazy, ReactElement } from 'react';

// libraries
import { Outlet, useRoutes } from 'react-router';

// paths
// layout
import CompactLayout from 'src/layouts/compact-layout';
import EmptyLayout from 'src/layouts/empty-layout';
import MainLayout from 'src/layouts/main-layout';
// pages
// index
import Login from 'src/pages/authority/login';
import OauthLogin from 'src/pages/authority/oauth-login';
import Home from 'src/pages/index/home';
import { paths } from 'src/routes/paths';
// authority
const Join = lazy(() => import('src/pages/authority/join'));
// board
const PostList = lazy(() => import('src/pages/board/post-list'));
const PostDetail = lazy(() => import('src/pages/board/post-detail'));

// error pages
const Page404 = lazy(() => import('src/pages/error/404'));
export default function Router(): ReactElement<any, string | JSXElementConstructor<any>> | null {
  return useRoutes([
    {
      path: paths.home,
      element: (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ),
      children: [
        { element: <Home />, index: true },
        { path: paths.board.posts, element: <PostList /> },
        { path: paths.board.post, element: <PostDetail /> },
      ],
    },
    {
      element: (
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      ),
      children: [
        { path: paths.auth.login, element: <Login /> },
        { path: paths.auth.join, element: <Join /> },
        { path: paths.error.p404, element: <Page404 /> },
        { path: '*', element: <Page404 /> },
      ],
    },
    {
      element: (
        <EmptyLayout>
          <Outlet />
        </EmptyLayout>
      ),
      children: [{ path: paths.auth.oauth, element: <OauthLogin /> }],
    },
  ]);
}
