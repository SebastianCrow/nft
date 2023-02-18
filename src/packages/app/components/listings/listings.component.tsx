import { FunctionComponent } from 'react';
import { Grid } from '../../../ui';

const TODO_ITEMS = [
  'Cell 1',
  'Cell 2',
  'Cell 3',
  'Cell 4',
  'Cell 5',
  'Cell 6',
  'Cell 7',
];

export const Listings: FunctionComponent = () => {
  return (
    <Grid>
      {TODO_ITEMS.map((name) => (
        <div key={name} className="border">
          <div>TODO_Image</div>
          <div className="flex justify-between">
            <div>{name}</div>
            <div>TODO_Price</div>
          </div>
        </div>
      ))}
    </Grid>
  );
};
