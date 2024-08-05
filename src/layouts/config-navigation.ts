import { useMemo } from 'react';
import { paths } from 'src/routes/paths';

export function useNavData() {
  const data = useMemo(
    () => [
      {
        title: '홈',
        path: paths.home
      },
      {
        title: '게시판',
        path: paths.board.main
      }
    ],
    []
  );

  return data;
}
