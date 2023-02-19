import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Grid, Input } from '../../../ui';
import { useFetchListings } from '../../hooks/useFetchListings';
import { classes, useIntersectionObserver } from '../../../../shared';
import { useFilterListings } from '../../hooks/useFilterListings';

export const Listings: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isFetching, hasNextPage, fetchNextPage } = useFetchListings();

  const filteredItems = useFilterListings({
    items: data?.pages.flatMap((page) => page) ?? [], // TODO: flat map
    searchQuery,
  });

  const listEndRef = useRef<HTMLDivElement>(null);

  const listEnd = useIntersectionObserver({
    ref: listEndRef,
  });

  useEffect(() => {
    if (!isFetching && listEnd) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetching, listEnd]);

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center">
        <Input
          value={searchQuery}
          onValueChange={setSearchQuery}
          placeholder="Search NFT name"
        />
      </div>
      <Grid>
        {filteredItems.map(({ name, price, extra: { img } }) => (
          <div key={name} className="rounded-xl overflow-hidden border">
            <div className="relative aspect-square">
              <img
                src={img}
                alt={`Image for ${name}`}
                className="absolute inset-0 z-10"
              />
              <div className="absolute inset-0 z-0 animate-pulse bg-slate-200" />
            </div>
            <div className="flex justify-between p-4">
              <div>{name}</div>
              <div>{price}</div>
            </div>
          </div>
        ))}
      </Grid>
      <div
        className={classes(
          'relative flex justify-center',
          hasNextPage === false ? 'hidden' : undefined
        )}
      >
        <div
          ref={listEndRef}
          className={classes(
            'absolute left-0 w-4 h-4 bg-red-500', // TODO: bg
            isFetching ? 'hidden' : undefined
          )}
        />
        <div>TODO: Spinner: Loading more awesome stuff...</div>
      </div>
    </div>
  );
};
