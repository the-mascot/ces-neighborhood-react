// react
import { lazy } from 'react';
// libraries
import { Outlet, useRoutes } from 'react-router';
// paths
import { paths } from 'src/routes/paths';
// layout
import MainLayout from 'src/layouts/main-layout';
// pages
import Home from 'src/pages/home';
import CompactLayout from 'src/layouts/compact-layout';
const BoardMain = lazy(() => import('src/pages/board/board-main'));
const Login = lazy(() => import('src/pages/login'));
const Page403 = lazy(() => import('src/pages/403'));
const Page404 = lazy(() => import('src/pages/404'));
const Page500 = lazy(() => import('src/pages/500'));
export default function Router() {
  return useRoutes([
    {
      path: '/',
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
      path: paths.auth.login,
      element: <Login />
    },
    {
      element: (
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      ),
      children: [
        { path: paths.error.p403, element: <Page403 /> },
        { path: paths.error.p404, element: <Page404 /> },
        { path: paths.error.p500, element: <Page500 /> },
        { path: '*', element: <Page404 /> }
      ]
    }
  ]);
}
