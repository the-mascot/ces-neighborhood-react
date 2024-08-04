import Router from 'src/routes/router';
import SettingProvider from 'src/context/setting-provider';
import ThemeProvider from 'src/theme/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <SettingProvider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </SettingProvider>
    </QueryClientProvider>
  );
}

export default App;
