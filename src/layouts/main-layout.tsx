import Main from './common/main';
import NavigationBar from 'src/layouts/common/navigation-bar';
import * as React from 'react';
import { useContext } from 'react';
import { SettingContext } from 'src/context/setting-context';
import Copyright from 'src/components/copyright';

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { themeMode, toggleColorMode } = useContext(SettingContext);

  return (
    <>
      <NavigationBar mode={themeMode} toggleColorMode={toggleColorMode} />

      <Main>{children}</Main>

      <Copyright sx={{ mt: 5, mb: 5 }} />
    </>
  );
}
