import * as React from 'react';
import { useContext } from 'react';

import Copyright from 'src/components/copyright';
import { SettingContext } from 'src/context/setting-context';
import NavigationBar from 'src/layouts/common/navigation-bar';

import Main from './common/main';

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props): JSX.Element {
  const { themeMode, toggleColorMode } = useContext(SettingContext);

  return (
    <>
      <NavigationBar mode={themeMode} toggleColorMode={toggleColorMode} />

      <Main>{children}</Main>

      <Copyright sx={{ mt: 5, mb: 5 }} />
    </>
  );
}
