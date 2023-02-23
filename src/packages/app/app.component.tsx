import type { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { ThemeProvider, ThemeWrapper } from '../ui';
import { Providers } from '../../shared';
import { Listings } from './components/listings/listings.component';

/**
 * NFT App with providers
 */
export const App: FunctionComponent = () => {
  const providers = useMemo(
    () => [
      <QueryClientProvider
        key="query-client-provider"
        client={new QueryClient()}
      />,
      <ThemeProvider key="theme-provider" />,
    ],
    []
  );

  return (
    <Providers providers={providers}>
      <ThemeWrapper>
        <Listings />
      </ThemeWrapper>
    </Providers>
  );
};
