import Router from 'src/routes/router';
import SettingProvider from 'src/context/setting-provider';
import ThemeProvider from 'src/theme/theme-provider';

function App() {
  return (
    <SettingProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </SettingProvider>
  );
}

export default App;
