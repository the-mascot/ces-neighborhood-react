import { useRoutes } from 'react-router';
import { paths } from 'src/routes/paths';
import MainLayout from 'src/layouts/main-layout';
import Home from 'src/pages/home';
import Login from 'src/pages/login';
import BoardMain from 'src/pages/board/board-main';

export default function Router() {
  return useRoutes([
    {
      path: paths.home,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: paths.auth.login,
      element: <Login />
    },
    {
      path: paths.board.main,
      element: (
        <MainLayout>
          <BoardMain />
        </MainLayout>
      )
    }
  ]);
}
