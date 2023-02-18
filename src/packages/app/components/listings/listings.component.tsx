import { FunctionComponent } from 'react';
import { Grid } from '../../../ui';
import { useFetchListings } from '../../hooks/useFetchListings.hook';

export const Listings: FunctionComponent = () => {
  const { items, finished } = useFetchListings(1);

  // TODO
  console.log(items, finished);

  return (
    <div>
      <Grid>
        {items.map(({ price, extra: { img } }, index) => (
          <div key={index} className="border">
            <img src={img} alt={`TODO: Image for name ${index + 1}`} />
            <div className="flex justify-between">
              <div>{`TODO: Name ${index + 1}`}</div>
              <div>{price}</div>
            </div>
          </div>
        ))}
      </Grid>
      <div>TODO: Loading more awesome stuff...</div>
    </div>
  );
};
