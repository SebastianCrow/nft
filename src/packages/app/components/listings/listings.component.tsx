import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Grid } from '../../../ui';
import { useFetchListings } from '../../hooks/useFetchListings';
import { useIntersectionObserver, usePrevious } from '../../../../shared';

export const Listings: FunctionComponent = () => {
  const [page, setPage] = useState(0);

  const { items, finished } = useFetchListings({ page });

  const listEndRef = useRef<HTMLDivElement>(null);

  const listEnd = useIntersectionObserver({
    ref: listEndRef,
  });

  const prevListEnd = usePrevious(listEnd);
  useEffect(() => {
    if (prevListEnd === false && listEnd) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [listEnd, prevListEnd]);

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
      {!finished && (
        <div ref={listEndRef}>TODO: Loading more awesome stuff...</div>
      )}
    </div>
  );
};
