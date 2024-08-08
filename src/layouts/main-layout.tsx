import { Container, Grid } from '@mui/material';
import Main from './common/main';
import Navigator from 'src/layouts/navigator';
import * as React from 'react';
import { useContext } from 'react';
import { SettingContext } from 'src/context/setting-context';

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { themeMode, toggleColorMode } = useContext(SettingContext);

  return (
    <>
      <Navigator mode={themeMode} toggleColorMode={toggleColorMode} />

      <Main>{children}</Main>
    </>
  );
}
