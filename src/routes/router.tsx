// react
import { lazy } from 'react';
// libraries
import { Outlet, useRoutes } from 'react-router';
// paths
import { paths } from 'src/routes/paths';
// layout
import MainLayout from 'src/layouts/main-layout';
import CompactLayout from 'src/layouts/compact-layout';
// pages
// index
import Home from 'src/pages/home';
import OauthLogin from 'src/pages/authority/oauth-login';
import EmptyLayout from 'src/layouts/empty-layout';
// authority
const Login = lazy(() => import('src/pages/authority/login'));
const Join = lazy(() => import('src/pages/authority/join'));
// board
const BoardMain = lazy(() => import('src/pages/board/board-main'));

// error pages
const Page403 = lazy(() => import('src/pages/403'));
const Page404 = lazy(() => import('src/pages/404'));
const Page500 = lazy(() => import('src/pages/500'));
export default function Router() {
  return useRoutes([
    {
      element: (
        <MainLayout>
          <Outlet />
        </MainLayout>
      ),
      children: [
        { path: paths.home, element: <Home /> },
        { path: paths.board.main, element: <BoardMain /> }
      ]
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
        { path: paths.error.p403, element: <Page403 /> },
        { path: paths.error.p404, element: <Page404 /> },
        { path: paths.error.p500, element: <Page500 /> },
        { path: '*', element: <Page404 /> }
      ]
    },
    {
      element: (
        <EmptyLayout>
          <Outlet />
        </EmptyLayout>
      ),
      children: [{ path: paths.auth.oauth, element: <OauthLogin /> }]
    }
  ]);
}
