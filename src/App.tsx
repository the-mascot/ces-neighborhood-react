import { JSX, Suspense } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import SplashScreen from 'src/components/loading/splash-screen';
import SettingProvider from 'src/context/setting-provider';
import ReduxProvider from 'src/redux/redux-provider';
import Router from 'src/routes/router';
import ThemeProvider from 'src/theme/theme-provider';
import 'src/fonts/index.css';

function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <ReduxProvider>
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
    </ReduxProvider>
  );
}

export default App;
