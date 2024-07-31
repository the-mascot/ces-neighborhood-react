import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useContext, useMemo } from 'react';
import lpThemeOptions from 'src/theme/lp-theme-options';
import { SettingContext } from 'src/context/setting-context';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { themeMode } = useContext(SettingContext);
  const lpTheme = useMemo(() => createTheme(lpThemeOptions(themeMode)), [themeMode]);

  return (
    <MuiThemeProvider theme={lpTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
