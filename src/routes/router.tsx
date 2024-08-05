import { useRoutes } from 'react-router-dom';
import Index from 'src/pages';
import path from 'src/routes/paths';
import MainLayout from 'src/layouts/main-layout';
import BoardMain from 'src/pages/board/board-main';
import Login from 'src/pages/login';

export default function Router() {
  return useRoutes([
    {
      path: path.home,
      element: (
        <MainLayout>
          <Index />
        </MainLayout>
      )
    },
    {
      path: path.login,
      element: (
        <MainLayout>
          <Login />
        </MainLayout>
      )
    },
    {
      path: path.board.main,
      element: (
        <MainLayout>
          <BoardMain />
        </MainLayout>
      )
    }
  ]);
}
