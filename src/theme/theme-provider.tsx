import { JSX, useContext, useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { SettingContext } from 'src/context/setting-context';
import lpThemeOptions from 'src/theme/lp-theme-options';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props): JSX.Element {
  const { themeMode } = useContext(SettingContext);
  const lpTheme = useMemo(() => createTheme(lpThemeOptions(themeMode)), [themeMode]);

  return (
    <MuiThemeProvider theme={lpTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
