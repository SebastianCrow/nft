import { FunctionComponent } from 'react';
import { Listings } from './components/listings/listings.component';

export const App: FunctionComponent = () => {
  return (
    <div className="p-4">
      <Listings />
    </div>
  );
};
