import { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Listings } from './components/listings/listings.component';
import { ThemeProvider, ThemeWrapper } from '../ui';

const queryClient = new QueryClient();

export const App: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemeWrapper>
          <Listings />
        </ThemeWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
