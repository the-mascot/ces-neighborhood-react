import { Outlet, useRoutes } from 'react-router';
import { paths } from 'src/routes/paths';
import MainLayout from 'src/layouts/main-layout';
import Home from 'src/pages/home';
import Login from 'src/pages/login';
import BoardMain from 'src/pages/board/board-main';
import { lazy, Suspense } from 'react';
import SplashScreen from 'src/components/loading/splash-screen';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
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
    }
  ]);
}
