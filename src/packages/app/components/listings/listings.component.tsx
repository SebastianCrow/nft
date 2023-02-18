import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Grid, Input } from '../../../ui';
import { useFetchListings } from '../../hooks/useFetchListings';
import { useIntersectionObserver, usePrevious } from '../../../../shared';
import { useFilterListings } from '../../hooks/useFilterListings';

export const Listings: FunctionComponent = () => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const { items, finished } = useFetchListings({ page });

  const filteredItems = useFilterListings({
    items,
    searchQuery,
  });

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
      {!finished && (
        <div ref={listEndRef}>TODO: Loading more awesome stuff...</div>
      )}
    </div>
  );
};
