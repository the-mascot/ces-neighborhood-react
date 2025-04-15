import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

type NavItem = {
  title: string;
  path: string;
};

export function useNavData(): NavItem[] {
  const data = useMemo(
    () => [
      {
        title: '홈',
        path: paths.home,
      },
      {
        title: '게시판',
        path: paths.board.posts,
      },
    ],
    []
  );

  return data;
}
