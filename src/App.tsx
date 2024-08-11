import Router from 'src/routes/router';
import SettingProvider from 'src/context/setting-provider';
import ThemeProvider from 'src/theme/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SplashScreen from 'src/components/loading/splash-screen';
import { Suspense } from 'react';
import 'src/fonts/index.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <SettingProvider>
        <ThemeProvider>
          <Suspense fallback={<SplashScreen />}>
            <Router />
          </Suspense>
        </ThemeProvider>
      </SettingProvider>
    </QueryClientProvider>
  );
}

export default App;
