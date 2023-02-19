import { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Listings } from './components/listings/listings.component';

const queryClient = new QueryClient();

export const App: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4">
        <Listings />
      </div>
    </QueryClientProvider>
  );
};
